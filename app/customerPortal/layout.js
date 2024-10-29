'use client';
import React from "react";
import Sidebar from "../components/sidebar/page";
import Navbar from "../components/navbar/navbar";



export default function Layout({ children }) {
  


  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-48">
          <Sidebar />
        </div>
        <div className="flex-grow  md:overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
}
