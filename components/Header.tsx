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

  const { method, updateMethod, url, updateUrl, aiRequest, handleSubmit } = useMethodUrlContext();

//   const { httpVerb, endpoint } = useMemo(() => {
//     let method = '';
//     let endpoint = '';

//     if (aiRequest && aiRequest.content) {
//         const lines = aiRequest.content.split('\n');
//         if (lines.length > 0) {
//             const firstLine = lines[0].trim();
//             const [parsedMethod, parsedEndpoint] = firstLine.split(' ');
//             if (parsedMethod && parsedEndpoint) {
//                 method = parsedMethod;
//                 endpoint = parsedEndpoint;
//                 console.log(method)
//             }
//         }
//     }
//     console.log(method)
//     return { httpVerb: method, endpoint };
// }, [aiRequest]);

  const validateAndSubmit = () => {
    if (url === '') {
      toast.error('Enter a URL');
      return;
    }
    handleSubmit();
  }

  const handleMethodChange = (method: string) => {
    updateMethod(method);
  };

  const handleUrlChange = (url: string) => {
    updateUrl(url);
  };


  return (
    <div className='w-full h-[100px] top-0 bg-black/20 p-3 flex items-center gap-5 justify-between'>
      <Select value={method} onValueChange={(e) => handleMethodChange(e)}>
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
      <Input value={url} onChange={(e) => handleUrlChange(e.target.value)} type="text" placeholder="http://localhost:3000" className="border-white/50 text-white" />
      <Button onClick={validateAndSubmit} >Enviar</Button>
    </div>
  )
}

export default Header
