"use client";

import Home from "@/component/home";
import NavBar from "@/component/navbar";
import React from "react";

const BlockComponent: React.FC = () => {
  return (
    <div>
      {/* Navbar */}
      <NavBar />

      {/* Section 1 */}
      <Home />

      {/* Section 2 */}
      <div
        id="section-2"
        className="h-[600px] flex items-center justify-center bg-gray-800 text-white"
      >
        <p className="text-xl">This is Section 2</p>
      </div>

      {/* Section 3 */}
      <div
        id="section-3"
        className="h-[600px] flex items-center justify-center bg-gray-900 text-white"
      >
        <p className="text-xl">This is Section 3</p>
      </div>

      {/* Section 4 */}
      <div
        id="section-4"
        className="h-[600px] flex items-center justify-center bg-black text-white"
      >
        <p className="text-xl">This is Section 4</p>
      </div>
    </div>
  );
};

export default BlockComponent;
