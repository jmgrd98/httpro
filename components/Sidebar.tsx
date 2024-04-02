'use client'

import { Button } from "./ui/button"
import UserAvatar from "./UserAvatar"

const Sidebar = () => {
  return (
    <div className="w-1/6 p-5 flex flex-col justify-evenly items-center rounded-r-xl bg-black/50 border-black/90 border-r h-screen left-0">
      <div className="flex items-center gap-5">
        <UserAvatar/>
        <p className="text-[#F3676C] text-3xl font-bold">HTTPro</p>
      </div>
      <Button  >Clicar</Button>
    </div>
  )
}

export default Sidebar
