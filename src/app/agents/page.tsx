"use client";
import { useState } from "react";
import Narration from "@/components/Narration";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import { Graph, relaxGraph } from "@/components/Graph";
import { getGroqCompletion } from "@/ai/groq";

export const dynamic = "force-dynamic";

const startYear = 2024;

export default function MainPage() {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [showUI, setShowUI] = useState<boolean>(true);
  const [playNarration, setPlayNarration] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);

  const handleResponse = async () => {
    setGenerating(true);
    try {
      const requestString = `${JSON.stringify({ graph })}`;
      console.log(requestString);
      const newStates = await getGroqCompletion(
        requestString,
        1024,
        `Your task is to update the knowledge graph.
          Generate an array of new Nodes and an array of new Edges to represent any concepts not already modeled by the knowledge graph.
          Update any existing nodes affected by the new information using a state map. Generate a new state object for each affected node using the node ID as the key and the new state as the value.
          Return your response in JSON in the format {newNodes:Node[], newEdges:Edge[], newStates:{[id:string]: string}}.Only return a single valid JSON object with no other text or explanation.`,
        true,
        "llama3-8b-8192"
      );
      const graphJSON = JSON.parse(newStates);
      console.log(graphJSON);
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
          captionPrompt={`You are provided with a world state. 
        Write a short script that narrates an engineer and project managers journey that dramatizes these events and embellishes them where necessary to make them 
        engaging to the audience. Narrate the journey as lines of dialogue by an engineer and a project manager. Place each item of dialogue on a new line. 
        Each line should be in the format "Speaker: Dialogue". Do not include any other text or explanation. Do not create blank lines of text.Always explain the scenario through a timeline, starting from 2019 and ending in 2050.The engineer and project manager should speak about the project as though they are reflecting on the journey they started this project 30 years ago in twenty nineteen and are communicating to each other the issues and tasks that arose as the years past and go into depth into those issues. This is basically a diary entry into the notes of the engineer and the project manager. Speak about the stages of production and go into a lot of depth into how the issues arose and what the engineer or project manager did to fix these issues. Use this as a basis for how to address the project but ensure you speak about all the ways you tried to fix the issues and what they are, dont just give broad solutions and ensure that u always mention the graph at least once everytime this plays.Generate a detailed plan for transforming global beef consumption to fish protein using the Ocean Farm 1 model, focusing on challenges and design evolution over 30 years, You need to expand and generate solutions/problems that arise within these stages.Use this next set of text as a base to develop and expand ideas on: 
        In 2019 we faced a daunting global challenge the environmental and health impacts of beef production were becoming unsustainable Determined to find a solution we began our mission to replace the worlds beef consumption with salmon as a primary protein source As engineers and project managers we chose the Ocean Farm 1 model due to its scalable potential Early challenges included high salmon mortality due to inadequate water conditions and monitoring systems From 2019 to 2022 we implemented advanced water treatment solutions and real-time monitoring systems reducing mortality rates and scaling production from 7500 to 36000 tonnes per farm From 2022 to 2025 we faced sea lice infestations and pervasive fish health issues We adopted integrated pest management strategies and enhanced disease surveillance boosting production efficiency by 20 percent and expanding capacity to 500000 tonnes We developed regional hubs in Norway Canada and Chile supported by a zonal management system achieving an annual output of 100000 tonnes We optimized farm layouts using advanced materials self-cleaning cages and filtration systems From 2025 to 2028 we focused on logistics processing facilities and sustainability Renewable energy sources like solar and wind power minimized environmental impacts Advanced water filtration systems automated feeding systems laser technology for lice removal and sustainable transport methods reduced emissions From 2028 to 2030 we expanded globally forming partnerships in Africa Asia and South America increasing capacity by 50 percent Training programs and R&D enhanced disease resistance and precision By 2030 production reached 600000 tonnes annually with improved efficiencies and international certifications From 2030 to 2035 we integrated AI for sustainability recycling and closed-loop production improving resource efficiency by 30 percent By 2040 we secured a 40 percent global market share and established the SalmonSolve Institute Public campaigns promoted fish over beef By 2050 we replaced global beef production with a sustainable fish alternative Our commitment to sustainability ensured long-term viability Continuous monitoring public awareness and policies gradually increased beef costs emphasizing fishs environmental and health benefits for a smooth transition Generate a series of images showing this evolution of Ocean Farm 1 fish farms Start with a simple modular fish farm structure floating on the ocean in 2019 with basic rectangular or cylindrical shapes connected by walkways As the design evolves incorporate advanced materials self-cleaning cages renewable energy sources such as solar panels and wind turbines and autonomous systems The final design should depict a large circular oil rig-like structure painted in yellow floating in the ocean This advanced farm should feature integrated logistics and processing facilities robust structural designs to withstand deep-sea conditions advanced water filtration systems and automated feeding systems `}
          
          imagePrompt={`You are an expert photographer describing images to the blind. You describe a scene provided by the user in vivid detail. 
          Describe the scene as if you were painting a picture with words.,
          Start your description with: "A photograph of" then use keywords and simple phrases separated by commas.
          End your description with: Canon EOS 5D Mark IV, 24mm, f/8, 1/250s, ISO 100, 2019
          Generate a series of images showing the evolution of Ocean Farm 1 fish farms, taking the viewer through the journey of design development from the perspective of engineers notes, sketches, and project timeline. Start with a simple, modular fish farm structure floating on the ocean in 2019, featuring basic cylindrical shapes connected by walkways within each circle. Initially, the design is minimal, focusing on basic fish containment via netting and small terraces. As the design evolves, incorporate advanced materials for durability, such as steel trusses and walkways that become more developed with an enclosed room at the center of the circular fish farm. Add renewable energy sources like solar panels and wind turbines mounted on the structures. Show autonomous systems for feeding and monitoring fish health, including screens and devices monitoring water levels and fish health. Highlight sketches and notes by engineers detailing these changes and improvements over time. Depict unintended implications such as high salmon mortality and sea lice infestations, and how these issues were addressed with design changes. Show the progression with intermediate designs featuring self-cleaning cages, integrated pest management strategies, and enhanced disease surveillance. The final design in 2050 should depict a large, circular oil rig-like structure painted in yellow, floating on the surface of the ocean. It should contain steel trusses, advanced walkways, rooms, and sophisticated monitoring systems all in one image. Include details of processing hubs in Norway, Chile, and Canada, with cranes carrying fish shipments off boats and into warehouse facilities. Show the evolution through visual representations of engineers' notes, sketches, and a project timeline that highlights the development stages and the solutions to challenges faced along the way.`}
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
          </div>
        </div>
      </div>
    </main>
  );
}
