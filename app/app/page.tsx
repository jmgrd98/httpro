'use client'

import Header from "@/components/Header";
import Request from "@/components/Request";
import Response from "@/components/Response";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex bg-black/90">
      <Sidebar />
      <div className="flex flex-col w-full text-black min-h-screen items-center justify-between">
      <Header/>
        
        <main className="flex items-center gap-5 max-h-full w-full mb-2 px-5">
          <Request/>
          <Response/>
        </main>
      </div>
    </div>
  );
}
