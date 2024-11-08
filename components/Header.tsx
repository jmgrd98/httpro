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
import { toast, ToastContainer } from 'react-toastify';
import { useMemo } from "react"
import { useMethodUrlContext } from "@/context/MethodUrlContext"

const Header = () => {

  const { method, setMethod, url, setUrl, aiRequest, handleSubmit } = useMethodUrlContext();

  const validateAndSubmit = () => {
    if (url === '') {
      toast.error('Enter a URL');
      return;
    }
    handleSubmit();
  }

  const handleMethodChange = (method: string) => {
    setMethod(method);
  };

  const handleUrlChange = (url: string) => {
    setUrl(url);
  };

  const getColorByMethod = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-[#0f4be0]";
      case "POST":
        return "bg-green-500";
      case "PUT":
        return "bg-yellow-500";
      case "PATCH":
        return "bg-purple-500";
      case "DELETE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className='w-full h-[100px] top-0  px-3 py-1 flex items-center gap-5 justify-between'>
      <Select value={method} onValueChange={(e) => handleMethodChange(e)}>
        <SelectTrigger className={`w-[180px] text-white border-none ${getColorByMethod(method)}`}>
          <SelectValue placeholder="GET" />
        </SelectTrigger>
        <SelectContent className={`${getColorByMethod(method)} text-white`}>
          <SelectGroup>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        value={url} onChange={(e) => handleUrlChange(e.target.value)}
        type="text"
        placeholder="https://example.com:3000"
        className="shadow-md bg-white text-black" />
      <Button variant={'primary'} onClick={validateAndSubmit} >Send</Button>
    </div>
  )
}

export default Header
