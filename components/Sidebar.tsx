'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import UserAvatar from "./UserAvatar"
import { useMethodUrlContext } from "@/context/MethodUrlContext"
import { FaTimes } from 'react-icons/fa'

const Sidebar = () => {

  const { method, updateMethod, url, updateUrl, body, updateBody, headers, updateHeaders, params, updateParams } = useMethodUrlContext();
  const [requests, setRequests] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);

  const addNewRequest = () => {
    setRequests([...requests, { method: method, url: url, body: body, headers: headers, params: params }]);
  }

  const updateInfo = (request: any) => {
    updateMethod(request.method);
    updateUrl(request.url);
    updateBody(request.body);
  }

  const deleteRequest = (index: number) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  const getColorByMethod = (requestMethod: any, url?: string) => {
    let color = ''
    switch (requestMethod){
      case 'GET':
        color = 'secondary'
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
      <Button variant='secondary' onClick={addNewRequest}>Save request</Button>
      <div className='flex flex-col gap-3'>
      {requests.map((request: any, index: number) => (
        <div key={index} className="flex items-center gap-5">
          <Button
            variant='secondary'
            color={getColorByMethod(request.method)}
            onClick={() => updateInfo(request)}
          >
            <p>{request.method}</p>
            <FaTimes onClick={() => deleteRequest(index)} style={{ cursor: 'pointer' }} />
          </Button>
        </div>
      ))}
    </div>
      <Button>Use AI</Button>
    </div>
  )
}

export default Sidebar
