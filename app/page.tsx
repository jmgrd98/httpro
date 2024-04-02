'use client'

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex bg-black/90">
      <Sidebar />
      <main className="flex flex-col w-full text-black min-h-screen items-center justify-between">
      <Header/>
        <h1>HTTPie</h1>
      </main>
    </div>
  );
}
