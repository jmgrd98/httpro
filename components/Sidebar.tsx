'use client'

import { Button } from "./ui/button"

const Sidebar = () => {
  return (
    <div className="w-1/6 p-5 flex flex-col items-center bg-black/10 h-screen left-0">
      <p>Sidebar</p>
      <Button  >Clicar</Button>
    </div>
  )
}

export default Sidebar
