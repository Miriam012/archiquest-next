"use client";
import Agents from "@/components/Agents";
import { useState } from "react";
import Narration from "@/components/Narration";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import { Graph, relaxGraph } from "@/components/Graph";
import { getGroqCompletion } from "@/ai/groq";

export const dynamic = "force-dynamic";

//This is new - just provide a high level goal and groq will figure out how to make agents
const agentGoal =
  "Build an offshore aquaculture farm to supply the worlds protein demands by 2050";

//set your agents here. If you leave this empty then Groq creates some for you based on your graph and the goal above.

  const initAgents = [
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

//Demo of running multiple agents that all compete for resources
export default function AgentsPage() {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [showUI, setShowUI] = useState<boolean>(true);
  const [playNarration, setPlayNarration] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);

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
          Return your response in JSON in the format {newNodes:Node[], newEdges:Edge[], newStates:{[id:string]: string}}.Only return a single valid JSON object with no other text or explanation.`,
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
    } catch (e) {
      console.error(e);
      alert("failed to update graph");
    }
    setGenerating(false);
  };

  const getGraph = (graph: Graph) => {
    setGraph(graph);
  };

  return (
    <main className="">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm lg:flex">
        <Narration
          play={playNarration}
          textToNarrate={JSON.stringify(graph)}
          captionPrompt={`You are provided with a world state and an array of agents performing tasks to make changes to this world state. 
        Write a short script that narrates an engineer and project managers journey that dramatizes these events and embellishes them where necessary to make them 
        engaging to the audience. Narrate the journey as lines of dialogue by an engineer and a project manager. Place each item of dialogue on a new line. 
        Each line should be in the format "Speaker: Dialogue". Do not include any other text or explanation. Always explain the scenario through a timeline, starting from 2019 and ending in 2050.The engineer and project manager should speak about the project as though they are reflecting on the journey they started this project 30 years ago in twenty nineteen and are communicating to each other the issues and tasks that arose as the years past and go into depth into those issues. This is basically a diary entry into the notes of the engineer and the project manager. Speak about the stages of production and go into a lot of depth into how the issues arose and what the engineer or project manager did to fix these issues. Use this as a basis for how to address the project but ensure you speak about all the ways you tried to fix the issues and what they are, dont just give broad solutions and ensure that u always mention the graph at least once everytime this plays.
        In 2019, we faced a daunting global challenge, the environmental and health impacts of beef production were becoming unsustainable. Determined to find a solution, our ambitious journey began with a mission to replace the worlds beef consumption with salmon as a primary protein source. As engineers and project managers, we dived into the intricate world of ocean farming, selecting the Ocean Farm 1 model as our starting point due to its scalable potential. We meticulously examined every aspect of the farms layout, water quality controls, and fish health monitoring protocols. Early on, we encountered significant challenges, including high salmon mortality caused by inadequate water conditions and monitoring systems. From 2019 to 2022, we addressed these issues head on by implementing advanced water treatment solutions and realtime monitoring systems. This effort dramatically reduced mortality rates and allowed us to scale production from 7,500 tonnes per farm to an impressive 36,000 tonnes per farm. Stage 1,From 2022 to 2025, we entered a new phase, facing and overcoming fresh challenges such as sea lice infestations and pervasive fish health issues. We adopted integrated pest management strategies and enhanced our disease surveillance models, boosting production efficiency by 20% and expanding our capacity to 500,000 tonnes. Recognizing the critical need for logistical optimization, we developed regional hubs in Norway, Canada, and Chile from 2025 to 2028. These hubs, supported by a zonal management system, streamlined our supply chains and facilitated global distribution, enabling us to achieve an annual output of 100,000 tonnes. This stage involved designing and deciding on the optimal fish farm layout—whether to have many small farms or fewer large ones, considering costs and production efficiency. Utilizing the graph, we visualized design consequences and other unintended outcomes. Solutions included enhancing cage design by implementing Ocean Farm 1 logic, using advanced materials to reduce maintenance and improve durability. Additionally, self-cleaning cages were designed to minimize fish lice and microplastics, while integrated filtration systems addressed mercury contamination.Stage 2, From 2028 to 2030, we focused on implementing the farms, manufacturing them, and evaluating their performance in Norway first, followed by Canada and Chile. This stage covered transportation logistics, processing facilities, and ensuring sustainable practices. We incorporated renewable energy sources such as solar and wind power into the fish farm designs to minimize environmental impacts from transportation emissions. Advanced water filtration systems were implemented to reduce pollution, and automated feeding systems ensured efficient and sustainable fish growth. To address challenges like fish lice, microplastics, and mercury, we employed innovative techniques such as using laser technology to remove lice, biodegradable materials to reduce microplastic pollution, and continuous monitoring systems to detect and mitigate mercury levels. Sustainable transport methods via rail carts, electric trucks, and energy-efficient ships were developed to further reduce emissions. Stage 3, Our global expansion phase from 2028 to 2030 saw us forming partnerships in Africa, Asia, and South America, increasing our production capacity by 50%. We also focused on knowledge transfer, developing training programs tailored to local needs. Our commitment to innovation continued with a 5% revenue reinvestment into R&D, enhancing disease resistance and aquaculture precision. From 2030 to 2035, we reached production maturity with an output of 600,000 tonnes annually. We improved operational efficiencies, reducing energy and water use, and gained international environmental and quality certifications. The subsequent five years were dedicated to integrating AI technologies and enhancing sustainability through recycling initiatives and closed loop production, which improved resource efficiency by 30%. By 2040, we had secured a 40% share of the global market and established the SalmonSolve Institute to lead in sustainable aquaculture practices. As we approached 2050, our focus on regenerative practices and ecosystem services ensured the long term viability and social responsibility of our operations. This stage involved dealing with unintended consequences of the designs, ensuring a shift from beef to fish, and making beef more expensive to encourage this transition. Solutions included continuous monitoring and adaptation of farm designs based on realtime data, improving public awareness and acceptance of fish as a sustainable protein source, and implementing policies to gradually increase the cost of beef. Educational campaigns were launched to highlight the environmental and health benefits of fish consumption over beef. These elements were integrated into Stage 1 planning to ensure a smooth transition from beef to fish production.By 2050, it had successfully replaced global beef production, establishing a sustainable and responsible alternative for global protein demand. Our adaptive approach to challenges and unwavering commitment to sustainability ensured a robust and resilient future, marking our legacy as pioneers in transforming the global protein landscape, but theres still much more to do, we need to continue to monitor and streamline production.`}

          imagePrompt={`You are an expert photographer describing images to the blind. You describe a scene provided by the user in vivid detail. 
          Describe the scene as if you were painting a picture with words. The is about the replacing beef with fish by 2050 to create a more sustainable future, do not generate anything outside of this concept line,
          generate images of scaling up ocean farm 1 which is an oil rig looking farm, show images of these being scaled up and more realistic as the timeline goes on. Create images of these farms being manufactured then implemented in Norway, canada and chile.
          Start your description with: "A photograph of" then use keywords and simple phrases separated by commas.
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
            <KnowledgeGraph graph={graph} onUpdate={getGraph} />
            <Agents
              world={graph}
              initAgents={initAgents}
              onUpdate={handleResponse}
              goal={agentGoal}
            />
          </div>
        </div>
      </div>
    </main>
  );
}