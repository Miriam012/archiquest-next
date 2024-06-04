import Link from "next/link";

export default function Home() {
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-24 bg-cover bg-center" 
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">WHAT IF WE REPLACED ALL THE BEEF <br></br>IN THE WORLD WITH FISH?</h1>
        <p className="text-lg text-center mb-6">FIND OUT MORE:</p>
        <div className="flex flex-col items-center space-y-4">
          {[
            { href: "/agents", text: "World Engine Simulation" },
            { href: "/panorama", text: "Panorama Viewer" },
            { href: "/recording", text: "Recording" },
            { href: "/design", text: "Drawings Gallery" },
          ].map((link) => (
            <Link href={link.href} key={link.href}>
              <div className="bg-white text-black py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer text-center">
                {link.text}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
