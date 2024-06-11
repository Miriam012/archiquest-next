"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [floatingTextVisible, setFloatingTextVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingTextVisible(true);
      setTimeout(() => {
        setFloatingTextVisible(false);
      }, 4000); // Text stays visible for 4 seconds
    }, 7000); // Text reappears every 7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-start justify-start p-10 bg-cover bg-center bg-no-repeat overflow-y-scroll">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay 
        muted 
        loop 
      >
        <source src="/pp.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-20 left-10 max-w-md z-10">
        <h1 className="text-4xl font-bold mb-4 text-white">FISH FOR FOOD</h1>
        <p className="text-lg mb-4 text-white">
          According to David Wallace-Wells, Greenpeace demands that the world must immediately cut its meat and dairy consumption by half by 2050 to avert a catastrophic climate disaster.
        </p>
        <p className="text-lg mb-6 text-white">
          Discover how Project FFF will replace beef with fish and change our future.
        </p>
        <Link href="/information">
          <div className="bg-darkblue text-white py-3 px-6 shadow-md transition-transform transform hover:scale-105 cursor-pointer text-center" style={{ backgroundColor: "#000033", fontSize: "1.5rem", padding: "15px 40px", marginBottom: "100px" }}>
            OUR SCENARIO
          </div>
        </Link>
      </div>

      <div className="relative z-10 mt-96 ml-10 space-y-8">
        <Link href="/design">
          <div className="relative w-64 h-20 bg-darkblue text-white flex items-center justify-center transition-transform transform hover:scale-105 cursor-pointer" style={{ backgroundColor: "#000033", fontSize: "1.5rem", padding: "15px 40px", marginBottom: "10px" }}>
            DRAWING GALLERY
          </div>
        </Link>
        <Link href="/agents">
          <div className="relative w-64 h-20 bg-darkblue text-white flex items-center justify-center transition-transform transform hover:scale-105 cursor-pointer" style={{ backgroundColor: "#000033", fontSize: "1.5rem", padding: "15px 40px", marginBottom: "10px" }}>
            WORLD ENGINE SIMULATION
          </div>
        </Link>
        <Link href="/recording">
          <div className="relative w-64 h-20 bg-darkblue text-white flex items-center justify-center transition-transform transform hover:scale-105 cursor-pointer" style={{ backgroundColor: "#000033", fontSize: "1.5rem", padding: "15px 40px", marginBottom: "10px" }}>
            RECORDING
          </div>
        </Link>
      </div>

      <div className={`text-white text-center text-sm mt-16 mb-16 z-10 w-full flex justify-center ${floatingTextVisible ? 'floating-text' : ''}`} style={{ position: 'fixed', bottom: '0' }}>
        <div>
          THIS JOURNEY OF A PROJECT TAKES ME BACK 30 YEARS. HOW WE DESIGNED THE FISH FARMS TO SUSTAIN THE WORLD&apos;S DEMAND....
          <br />
          ...FIND OUT MORE ON WORLD ENGINE SIMULATION...
        </div>
      </div>
    </main>
  );
}

