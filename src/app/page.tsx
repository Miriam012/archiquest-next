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
    <main
      className="relative flex min-h-screen flex-col items-start justify-start p-10 bg-cover bg-center bg-no-repeat overflow-y-scroll"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute top-20 left-10 max-w-md z-10">
        <h1 className="text-4xl font-bold mb-4 text-white">FISH FOR FOOD</h1>
        <p className="text-lg mb-4 text-white">
          According to David Wallace-Wells, Greenpeace demands that the world must immediately cut its meat and dairy consumption by half by 2050 to avert a catastrophic climate disaster.
        </p>
        <p className="text-lg mb-6 text-white">
          Discover how Project FFF will replace beef with fish and change our future.
        </p>
        <Link href="/information">
          <div className="bg-gray-800 text-white py-2 px-4 shadow-md transition-transform transform hover:scale-105 cursor-pointer text-center">
            Find out more here
          </div>
        </Link>
      </div>

      <div className="relative z-10 mt-96 ml-10 space-y-8">
        <Link href="/design">
          <div className="relative w-64 h-32 transition-transform transform hover:scale-105 cursor-pointer">
            <img src="/gallery.png" alt="Drawing Gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-lg font-bold">DRAWING GALLERY</span>
            </div>
          </div>
        </Link>
        <Link href="/agents">
          <div className="relative w-64 h-32 transition-transform transform hover:scale-105 cursor-pointer">
            <img src="/worldengine.png" alt="World Engine Simulation" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-lg font-bold">WORLD ENGINE SIMULATION</span>
            </div>
          </div>
        </Link>
        <Link href="/recording">
          <div className="relative w-64 h-32 transition-transform transform hover:scale-105 cursor-pointer">
            <img src="/recording.png" alt="Recording" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-lg font-bold">RECORDING</span>
            </div>
          </div>
        </Link>
      </div>

      <div className={`text-white text-center text-sm mt-16 mb-16 z-10 w-full flex justify-center ${floatingTextVisible ? 'floating-text' : ''}`}>
        <div>
          THIS JOURNEY OF A PROJECT TAKES ME BACK 30 YEARS. HOW WE DESIGNED THE FISH FARMS TO SUSTAIN THE WORLD&apos;S DEMAND....
          <br />
          ...FIND OUT MORE ON WORLD ENGINE SIMULATION...
        </div>
      </div>
    </main>
  );
}
