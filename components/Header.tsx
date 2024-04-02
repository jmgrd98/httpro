'use client'

import UserAvatar from "./UserAvatar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <div className='w-full h-[100px] top-0 bg-black/20 p-3 flex items-center gap-5 justify-between'>
      <Input type="text" placeholder="http://localhost:3000" />
      <Button  >Clicar</Button>
    </div>
  )
}

export default Header
