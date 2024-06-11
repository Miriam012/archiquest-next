"use client";
import Agents from "@/components/Agents";
import { useState } from "react";
import Narration from "@/components/Narration";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import { Graph, relaxGraph } from "@/components/Graph";
import { getGroqCompletion } from "@/ai/groq";
import Timeline, { TimelineEvent } from "@/components/Timeline";
import { jsonText } from "@/ai/prompts";
import { unstable_noStore as noStore } from "next/cache";

//This is new - just provide a high level goal and groq will figure out how to make agents
const agentGoal =
  "Build an offshore aquaculture farm to supply the worlds protein demands by 2050";
//set your agents here. If you leave this empty then Groq creates some for you based on your graph and the goal above.
const initAgents: any = [
    {
      name: "Eco-Regulatory Overseer",
      goal: "As the Eco-Regulatory Overseer, you are responsible for ensuring the environmental sustainability of Operation Ocean Harvest. This groundbreaking initiative aims to mitigate climate change by replacing beef with fish, utilizing 4,445 high-capacity fish farms globally. Your role focuses on addressing public and regulatory concerns about the environmental implications of this shift. Analyze and report the environmental challenges, including habitat disruption and resource use, projecting these impacts every four years from 2019 to 2050, and develop strategies to minimize ecological footprints.",
      plan: "",
      consequences: "",
      resourcesRequired: "",
      solution: ""
    },
    {
      name: "Aquaculture Economic Analyst",
      goal: "As the Aquaculture Economic Analyst, your focus is on navigating the economic transformations triggered by Operation Ocean Harvest. This initiatives success in replacing beef with sustainably farmed fish has reshaped global food markets. Evaluate the economic shifts, including impacts on coastal economies, job market fluctuations due to automation in fish farming, and the broader economic implications of reduced beef production. Your analyses, conducted every four years from 2019 to 2050, aim to identify economic opportunities and challenges within this new paradigm.",
      plan: "",
      consequences: "",
      resourcesRequired: "",
      solution: ""
    },
    {
      name: "Agricultural Transition Strategist",
      goal: "In your role as the Agricultural Transition Strategist, you manage the delicate balance of transitioning land and resources from beef production to support aquaculture growth under Operation Ocean Harvest. With a significant reduction in beef consumption, your job is to strategize the repurposing of agricultural lands, potentially for aquaculture feed production or other sustainable practices. Outline the phased transitions and address the concerns of stakeholders in the beef industry, documenting changes and plans every four years from 2019 to 2050.",
      plan: "",
      consequences: "",
      resourcesRequired: "",
      solution: ""
    },
    {
      name: "Transportation Logistics Coordinator",
      goal: "As the Transportation Logistics Coordinator, your job is to manage the logistics of transporting millions of tonnes of fish from the fish farms in Norway, Chile, and Canada to markets worldwide. You face the challenge of creating a sustainable, efficient transportation network that minimizes environmental impact while ensuring fresh delivery. Your role becomes critical as the global reliance on fish increases, necessitating innovations in shipping technology and methods.",
      plan: "",
      consequences: "",
      resourcesRequired: "",
      solution: ""
    },
    {
      name: "Ocean Farm 1 Operational Specialist",
      goal: "As an Ocean Farm 1 Operational Specialist, your mission is to oversee the day-to-day operations of a high-tech fish farm. You explain the functionality and rationale behind the Ocean Farm 1 system, focusing on how it supports sustainable large-scale aquaculture. Your insights help the public and stakeholders understand the technology and its benefits over traditional aquaculture methods.",
      plan: "",
      consequences: "",
      resourcesRequired: "",
      solution: ""
    }
  ];

//if this is true, agents add nodes to the graph as well as update implementation data. Its slower.
const addNodes = true;
//start year
const startYear = 2024;

//Demo of running multiple agents that all compete for resources
export default function AgentsPage() {
  noStore();
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [showUI, setShowUI] = useState<boolean>(true);
  const [playNarration, setPlayNarration] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(startYear);

  const handleResponse = async (newAgents: any[]) => {
    setGenerating(true);
    //now we have the new agents, we can implement our logic for how to update the graph.
    try {
      const requestString = `${JSON.stringify({ graph, newAgents })}`;
      console.log(requestString);
      //just refine implementation
      const newStates = await getGroqCompletion(
        requestString,
        1024,
        `The user will provide you with an implementation of a specific concept in the form of a knowledge graph together with an array of agents working towards specific goals within this graph.
          Your task is to update the knowledge graph to reflect the changes made by the agents.
          Generate an array of new Nodes and an array of new Edges to represent any concepts not already modelled by the knowledge graph.
          Update any existing nodes affected by the agents using a state map. Generate a new state object for each affected node using the node ID as the key and the new state as the value.
          Return your response in JSON in the format {newNodes:Node[], newEdges:Edge[], newStates:{[id:string]: string}}.` +
          jsonText,
        true,
        "llama3-8b-8192"
      );
      const graphJSON = JSON.parse(newStates);
      console.log(graphJSON);
      //iterate over state updates
      const updatedNodes = [...graph.nodes];
      for (const [id, state] of Object.entries(graphJSON.newStates)) {
        const node: any = updatedNodes.find((n) => n.id === id);
        if (node) node.state = state;
      }
      const edges = [...graph.edges, ...graphJSON.newEdges];
      const relaxed = relaxGraph(
        [...updatedNodes, ...graphJSON.newNodes],
        edges
      );
      const newGraph = { nodes: relaxed, edges: edges };

      setGraph(newGraph);
      setCurrentYear((c) => c + 5);
      //add to timeline
      timelineEvents.push({
        time: currentYear,
        title: currentYear.toString(),
        data: newGraph,
      });
    } catch (e) {
      console.error(e);
      alert("failed to update graph");
    }
    setGenerating(false);
  };

  const getGraph = (graph: Graph) => {
    setGraph(graph);
    setCurrentYear((c) => c + 2);
    timelineEvents.push({
      time: currentYear,
      title: currentYear.toString(),
      data: graph,
    });
  };

  const handleTimelineSelect = (event: TimelineEvent) => {
    setGraph(event.data);
  };

  return (
    <main className="">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm lg:flex">
        <Narration
          play={playNarration}
          textToNarrate={JSON.stringify(graph)}
          captionPrompt={`You are provided with a world state.  
          Write a short script that narrates an engineer and project managers journey that dramatizes these events and embellishes them where necessary to make them  
          engaging to the audience. Narrate the journey as lines of dialogue by an engineer and a project manager. Place each item of dialogue on a new line.  
          Each line should be in the format "Speaker: Dialogue". Do not include any other text or explanation. Do not create blank lines of text. Always explain the scenario through a timeline, starting from 2019 and ending in 2050.The engineer and project manager should speak about the project as though they are reflecting on the journey they started this project 30 years ago in twenty nineteen and are communicating to each other the issues and tasks that arose as the years past and go into depth into those issues. This is basically a diary entry into the notes of the engineer and the project manager. Speak about the stages of production and go into a lot of depth into how the issues arose and what the engineer or project manager did to fix these issues. Use this as a basis for how to address the project but ensure you speak about all the ways you tried to fix the issues and what they are, dont just give broad solutions and ensure that u always mention the graph at least once every time this plays. Generate a detailed plan for transforming global beef consumption to salmon by using the Ocean Farm 1 model, focusing on challenges and design evolution over 30 years, you need to expand and generate solutions/problems that arise within these stages. Use this next set of text as a base to develop and expand ideas on, only use the most important parts you feel like adding in, choose a few issues to talk about per time period, do not list all of them:  
          In 2019 we faced a daunting global challenge the environmental and health impacts of beef production were becoming unsustainable Determined to find a solution we began our mission to replace the worlds beef consumption with salmon as a primary protein source As engineers and project managers we chose the Ocean Farm 1 model due to its scalable potential Early challenges included high salmon mortality due to inadequate water conditions and lack of monitoring systems From 2019 to 2022 fish feed became an issue which set us back, threatening the premature end to the project. Due to the scaling up of the farm, more fish feed required therefore we created feed from the waste produced from production. We implemented advanced water treatment solutions such as water filtration systems and real-time monitoring equipment with staff regularly maintaining and monitoring equipment and fish health which resulted in reducing mortality rates and scaling production from 7500 to 36000 tonnes per farm From 2022 to 2025 we saw the intricate genetic engineering and genetic modification of the salmon, we identified and isolatated of mercury resistant genes and saw them implemented into the salmon, which also contain high levels of key supplements such as iron, Vitamin b12, Calcium and essential amino acids, making them sufficient for humans to consume in place of beef. Through these years we also faced sea lice infestations and pervasive fish health issues We adopted integrated pest management strategies and enhanced disease surveillance boosting production efficiency by 20 percent and expanding capacity to 500000 tonnes. We developed regional hubs in Norway Canada and Chile supported by a zonal management system achieving an annual output of 100000 tonnes We optimized farm layouts using advanced materials self-cleaning cages and filtration systems. Also we faced an increase in diseases within the fish due to limited genetic lines, which led to reduced genetic diversity, to combat this we included a rotation of fish monthly to diversify genetic lines. From 2025 to 2028 we focused on logistics processing facilities and sustainability Renewable energy sources like solar and wind power minimized environmental impacts Advanced water filtration systems automated feeding systems laser technology for lice removal and sustainable transport methods reduced emissions, but we also came across a major issue of mercury poisoning, which left people hesitant in consuming large amount of fish, in order to mitigate this we needed to conduct extensive research into the feed quality of the fish farms to control mercury dosages and it was vital to investing in new technologies such as further advanced filtration systems and using microorganisms or plants that naturally absorb or alter mercury in the environment. Then from 2028 to 2030 we expanded globally forming partnerships in Africa Asia and South America increasing capacity by 50 percent Training programs and R&D enhanced disease resistance and precision By 2030 production reached 600000 tonnes annually with improved efficiencies and international certifications From 2030 to 2035 we integrated AI for sustainability recycling and closed-loop production improving resource efficiency by 30 percent, also we implemented renewable energy sources such as wind turbines and solar panels to combat the high energy usage which became detrimental to the evolution of the project to ensure expansion of production, otherwise production would have come to a halt. By 2040 we secured a 40 percent global market share and established the Fish For Food Institute Public campaigns promoted fish over beef, due to the unexpected death of fish stock due to an increase in ocean acidification we enclosed farming area designed to minimise environmental threats to fish health such as reducing the risk of biological harm to the fish stock. By 2050 we replaced global beef production with a sustainable fish alternative Our commitment to sustainability ensured long-term viability Continuous monitoring public awareness and policies gradually increased beef costs emphasizing fishs environmental and health benefits for a smooth transition. Our fish farms were also being efficiently and more sustainably produced. This advanced aquaculture setup is equipped with sensors and automated systems for optimal fish feeding and growth in the aquaculture region.`}
          
        imagePrompt={`You are an expert photographer tasked with describing images to the blind for a documentary focusing on replacing beef with fish by 2050 to promote a sustainable future. Begin your narrative with: "A photograph of," and meticulously detail each scene. Use sophisticated phrases to richly depict each design change and technological advancement within modern aquaculture systems.  
        Describe the sleek, robotic arms of automated feeding systems as they precision-drop feed, their metallic surfaces gleaming under the water-refracted sunlight. Highlight the state-of-the-art motion sensors and programmable logic controllers that adjust feed based on fish growth rates and water conditions.  
        Capture the complex network of advanced water filtration technology, detailed enough to see the mesh’s fine texture and the robust, yet environmentally friendly materials that ensure high-efficiency water recycling and purification.  
        Illustrate the next-generation fish pens, focusing on their modular design and the integration of bio-sensitive materials that adapt to the health and movement of the fish, equipped with sensors that monitor conditions and adjust barriers to optimize space and flow.  
        When a design change or technology is mentioned show a zoom in on the high-tech, machinery that is described such as, sea lice monitoring system, wind turbines, close ups of filtration systems, storage systems. Also whenever genetic modification is mentioned show people in labs working on fish species and genetically modifying them. Also when sealice is mentioned show the salmon in the ocean farm underwater. When there is an overview of the fish farms show an ocean farm designed as a large circular oil rig, positioned in the open waters near Norway. The structure should be yellow or white or yellow and red and white or any metal colour, prominently floating on the ocean surface. It includes a central hub resembling a control tower for operations and multiple interconnected rings around it, each filled with netting and various marine life. This advanced aquaculture setup is equipped with sensors and automated systems for optimal fish feeding and monitoring. The view should be axonometric, capturing the entire structure in a detailed and technical manner. The surrounding sea and sky should be vast and clear, reflecting a clean, sustainable aquaculture environment similar to the scenes in the provided images 
        when the year 2050 is mentioned display images of an ocean farm designed as a large circular oil rig, positioned in the open waters near Norway. The structure should be vibrant yellow and white, prominently floating on the ocean surface. It includes a central hub resembling a control tower for operations and multiple interconnected rings around it, each filled with netting and various marine life in an enclosed circular habitat. This advanced aquaculture setup is equipped with sensors and automated systems for optimal fish feeding and monitoring. The view should be axonometric, capturing the entire structure in a detailed and technical manner. The surrounding sea and sky should be vast and clear, reflecting a clean, sustainable aquaculture environment.  
        Conclude each description with technical camera settings to highlight the high-definition realism of the photographs: Canon EOS 5D Mark IV, 24mm, f/8, 1/250s, ISO 100, 2019. This format ensures that each technological advancement is visually captured, clearly showing how each piece of machinery and design contributes to the overarching goal of sustainable aquaculture.`}
        />
        <div id="Agent UI" className="flex flex-col p-8 z-50">
          <button
            className="p-2 border rounded-lg bg-white/25 mb-2"
            onClick={() => setShowUI(!showUI)}
          >
            {showUI ? "Hide UI" : "Show UI"}
          </button>
          <div
            className={`${
              showUI ? "flex" : "hidden"
            }  flex-col w-full bg-white p-4 rounded-lg gap-4`}
          >
            <button
              className="p-2 rounded-lg border bg-white shadow"
              onClick={() => setPlayNarration(!playNarration)}
            >
              {playNarration ? "Stop Narrating" : "Start Narrating"}
            </button>
            {generating && <span>Updating Graph...</span>}
            <Timeline events={timelineEvents} onSelect={handleTimelineSelect} />
            <KnowledgeGraph graph={graph} onUpdate={getGraph} />
            <Agents
              world={graph}
              initAgents={initAgents}
              onUpdate={handleResponse}
              goal={agentGoal}
              time={currentYear.toString()}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
