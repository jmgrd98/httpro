'use client'

import UserAvatar from "./UserAvatar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Header = () => {
  return (
    <div className='w-full h-[100px] top-0 bg-black/20 p-3 flex items-center gap-5 justify-between'>
      <Select>
        <SelectTrigger className="w-[180px] bg-transparent text-white border-white/50">
          <SelectValue placeholder="GET" />
        </SelectTrigger>
        <SelectContent className="bg-transparent text-white border-white/50">
          <SelectGroup>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input type="text" placeholder="http://localhost:3000" className="border-white/50" />
      <Button  >Enviar</Button>
    </div>
  )
}

export default Header
