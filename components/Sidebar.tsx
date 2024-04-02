'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import UserAvatar from "./UserAvatar"
import { useMethodUrlContext } from "@/context/MethodUrlContext"

const Sidebar = () => {

  const { method, updateMethod, url, updateUrl, body, updateBody, headers, updateHeaders, params, updateParams } = useMethodUrlContext();
  const [requests, setRequests] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);

  const addNewRequest = () => {
    setRequests([...requests, { method: method, url: url, body: body, headers: headers, params: params }]);
  }

  // const updateInfo = (request: any) => {
  //   updateMethod(request.method);
  //   updateUrl(request.url);
  //   updateBody(request.body);
  // }

  const deleteRequest = (index: number) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  const getColorByMethod = (requestMethod: any, url: string) => {
    let color = ''
    switch (requestMethod){
      case 'GET':
        color = 'primary'
        break;
      case 'POST':
        color = 'success'
        break;
      case 'PUT':
        color = 'secondary'
        break;
      case 'PATCH':
        color = 'secondary'
        break;
      case 'DELETE':
        color = 'error'
        break;
      default:
        color = 'primary'
        break;
    }
    return color;
  };

  const handleClose = () => {
    setShowModal(false)
}

  return (
    <div className="w-1/6 p-5 flex flex-col justify-evenly items-center rounded-r-xl bg-black/50 border-black/90 border-r h-screen left-0">
      <div className="flex items-center gap-5">
        <UserAvatar/>
        <p className="text-[#F3676C] font-mono text text-3xl font-bold">HTTPro</p>
      </div>
      <div>

      </div>
      <Button>Use AI</Button>
    </div>
  )
}

export default Sidebar
