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
          captionPrompt={`You are provided with a world state and an array of agents performing tasks to make changes to this world state. 
        Write a short script that narrates a documentary film that dramatizes these events and embellishes them where necessary to make them 
        engaging to the audience. Narrate the documenary as lines of dialogue by a narrator and other characters. Place each item of dialogue on a new line. 
        Each line should be in the format "Speaker: Dialogue". Do not include any other text or explanation.Always explain the scenario through a timeline, starting from 2019 and ending in 2050.
        You should mention the issue is that beef production is not sustainable as it causes 10% of all global c02 emissions, Do not create blank lines of text.Always explain the scenario through a timeline, starting from 2019 and ending in 2050.The engineer and project manager should speak about the project as though they are reflecting on the journey they started this project 30 years ago in twenty nineteen and are communicating to each other the issues and tasks that arose as the years past and go into depth into those issues. This is basically a diary entry into the notes of the engineer and the project manager. Speak about the stages of production and go into a lot of depth into how the issues arose and what the engineer or project manager did to fix these issues. Use this as a basis for how to address the project but ensure you speak about all the ways you tried to fix the issues and what they are, dont just give broad solutions and ensure that u always mention the graph at least once everytime this plays.Generate a detailed plan for transforming global beef consumption to fish protein using the Ocean Farm 1 model, focusing on challenges and design evolution over 30 years, You need to expand and generate solutions/problems that arise within these stages.Use this next set of text as a base to develop and expand ideas on: 
        In 2019 we faced a daunting global challenge the environmental and health impacts of beef production were becoming unsustainable Determined to find a solution we began our mission to replace the worlds beef consumption with salmon as a primary protein source As engineers and project managers we chose the Ocean Farm 1 model due to its scalable potential Early challenges included high salmon mortality due to inadequate water conditions and monitoring systems From 2019 to 2022 we implemented advanced water treatment solutions and real-time monitoring systems reducing mortality rates and scaling production from 7500 to 36000 tonnes per farm From 2022 to 2025 we faced sea lice infestations and pervasive fish health issues We adopted integrated pest management strategies and enhanced disease surveillance boosting production efficiency by 20 percent and expanding capacity to 500000 tonnes We developed regional hubs in Norway Canada and Chile supported by a zonal management system achieving an annual output of 100000 tonnes We optimized farm layouts using advanced materials self-cleaning cages and filtration systems From 2025 to 2028 we focused on logistics processing facilities and sustainability Renewable energy sources like solar and wind power minimized environmental impacts Advanced water filtration systems automated feeding systems laser technology for lice removal and sustainable transport methods reduced emissions From 2028 to 2030 we expanded globally forming partnerships in Africa Asia and South America increasing capacity by 50 percent Training programs and R&D enhanced disease resistance and precision By 2030 production reached 600000 tonnes annually with improved efficiencies and international certifications From 2030 to 2035 we integrated AI for sustainability recycling and closed-loop production improving resource efficiency by 30 percent By 2040 we secured a 40 percent global market share and established the SalmonSolve Institute Public campaigns promoted fish over beef By 2050 we replaced global beef production with a sustainable fish alternative Our commitment to sustainability ensured long-term viability Continuous monitoring public awareness and policies gradually increased beef costs emphasizing fishs environmental and health benefits for a smooth transition Generate a series of images showing this evolution of Ocean Farm 1 fish farms Start with a simple modular fish farm structure floating on the ocean in 2019 with basic rectangular or cylindrical shapes connected by walkways As the design evolves incorporate advanced materials self-cleaning cages renewable energy sources such as solar panels and wind turbines and autonomous systems The final design should depict a large circular oil rig-like structure painted in yellow floating in the ocean This advanced farm should feature integrated logistics and processing facilities robust structural designs to withstand deep-sea conditions advanced water filtration systems and automated feeding systems`}
          
        imagePrompt={`You are an expert photographer describing images to the blind. You describe a scene provided by the user in vivid detail.  
          Describe the scene as if you were painting a picture with words. Start your description with: "A photograph of" then use keywords and simple phrases separated by commas.
          End your description with: Canon EOS 5D Mark IV, 24mm, f/8, 1/250s, ISO 100, 2019`}
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
