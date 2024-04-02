'use client'

import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex bg-black/90">
      <Sidebar />
      <main className="flex w-full text-black min-h-screen items-center justify-between p-24">
        <h1>HTTPie</h1>
      </main>
    </div>
  );
}
