'use client'

import { useState } from "react";
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useMethodUrlContext } from "../context/MethodUrlContext";
import { FaFileExport } from "react-icons/fa";
import { Badge } from "./ui/badge";

function Response() {
  const { method, message, response } = useMethodUrlContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const getColorByStatus = (status: number) => {
    if (status >= 200 && status < 300) {
      return 'success';
    } else if (status >= 400 && status < 600) {
      return 'destructive';
    } else {
      return 'default';
    }
  };

  return (
    <section className='border-2 border-gray-400 rounded-xl h-full p-5 w-1/2'>
      <div className='flex flex-col gap-3'>
        <p className="text-xl font-bold text-white/90">Response</p>
        {!response && (
          <div className="mt-[120px] flex flex-col items-center justify-center gap-5">
            <FaFileExport className="w-20 h-20 text-gray-200" />
            <p className="text-xl  text-gray-400">Make a request</p>
          </div>
        )}
        {response && 
          <Badge 
            variant={getColorByStatus(response.status)}
            className="w-[25%] font-bold"
          >{response.status} {response.statusText}</Badge>
        }
      </div>
      {response && response.status >= 400 && (
        <div className='mt-5 bg-gray-300 p-3 rounded-xl overflow-y-scroll max-h-[400px] relative'>
          <pre>{message}</pre>
          <button onClick={handleCopy} className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2">
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>
      )}
      {(response) && (
        <div className='mt-5 bg-gray-300 p-3 rounded-xl overflow-y-scroll max-h-[400px] max-w-[500px] relative'>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <button onClick={handleCopy} className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2">
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>
      )}
    </section>
  );
}

export default Response;