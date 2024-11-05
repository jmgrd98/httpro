'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { UserButton } from '@clerk/clerk-react'
import { useMethodUrlContext } from "@/context/MethodUrlContext"
import { FaTimes } from 'react-icons/fa'
import { CiCirclePlus } from 'react-icons/ci'
import Image from "next/image"

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
    let color: "link" | "primary" | "secondary" | "destructive" | "default" | "alert" | "success" | "outline" | "ghost" | "purple" | null | undefined = 'default';
    switch (requestMethod){
      case 'GET':
        color = 'primary'
        break;
      case 'POST':
        color = 'success'
        break;
      case 'PUT':
        color = 'alert'
        break;
      case 'PATCH':
        color = 'purple'
        break;
      case 'DELETE':
        color = 'destructive'
        break;
      default:
        color = 'default'
        break;
    }
    return color;
  };

  const handleClose = () => {
    setShowModal(false)
}

  return (
    <div className="w-1/6 p-5 flex flex-col justify-between gap-5 items-center rounded-r-xl bg-black/50 border-black/90 border-r h-screen left-0">
      <div>
        <Image src={'/HTTPro.svg'} width={60} height={60} alt="HTTPro" className='mb-10' />
        <div className="flex flex-col gap-2 mb-10">
          <Button className="flex gap-2" variant='secondary' onClick={() => addNewRequest()}>
            <p>Save request</p>
            <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}}/>
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        {requests.map((request: any, index: number) => (
          <div key={index} className="flex items-center gap-5">
            <Button
              className="flex items-center justify-around w-[120px]"
              variant={getColorByMethod(request.method)}
              onClick={() => updateInfo(request)}
            >
              <p>{request.method}</p>
              <FaTimes onClick={() => deleteRequest(index)} style={{ cursor: 'pointer' }} />
            </Button>
          </div>
        ))}
      </div>

      {/* <div className="">
        <Button>Use AI</Button>
      </div> */}
      <div className="w-full mb-5">
          <UserButton userProfileUrl="/profile"/>
        </div>
    </div>
  )
}

export default Sidebar
