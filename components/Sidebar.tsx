'use client'

import { Button } from "./ui/button"

const Sidebar = () => {
  return (
    <div className="w-1/6 p-5 flex flex-col items-center rounded-r-xl bg-slate-900/50 border-white border-r-2 h-screen left-0">
      <p>Sidebar</p>
      <Button  >Clicar</Button>
    </div>
  )
}

export default Sidebar
