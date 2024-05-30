import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-wrap gap-4">
        {[
          { href: "/timelapse", text: "Timelapse Demo" },
          { href: "/artcritic", text: "Art Critic Demo" },
          { href: "/map", text: "Simple Map Demo" },
          { href: "/exploration", text: "Exploration" },
          { href: "/experts", text: "Experts Demo" },
          { href: "/whatsthis", text: "What is This?" },
          { href: "/realtime", text: "Realtime image generation" },
          { href: "/debate", text: "Debate Simulator" },
          { href: "/agents", text: "Agent Simulator" },
          { href: "/panorama", text: "Panorama Viewer" },
          { href: "/drawing", text: "Sketch to Image" },
          { href: "/speech", text: "Speech to Text" },
          { href: "/test/image", text: "Image Speed Comparison" },
          { href: "/test/text", text: "Text Speed Comparison" },
          { href: "/graph", text: "Graph Concepts" },
          { href: "/gameshow", text: "Gameshow" },
          { href: "/drawings", text: "Drawings" },
        ].map((link) => (
          <Link href={link.href} key={link.href}>
            <div className="bg-white text-black py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer">
              {link.text}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
