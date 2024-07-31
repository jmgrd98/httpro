'use client'

import { useState } from 'react';
import { FaCopy, FaCheck, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { CiCirclePlus } from "react-icons/ci";
import { useMethodUrlContext } from '../context/MethodUrlContext';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { IoMdKey } from "react-icons/io";
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Input } from './ui/input';

function Request() {
  const { 
      headers,
      tokens,
      updateParams,
      updateHeaders,
      body,
      updateBody,
      updateTokens,
      aiRequest 
  } = useMethodUrlContext();

  type Param = {
    name: string;
    value: string;
  };
  
  type Header = {
    name: string;
    value: string;
  };
  
  type Token = {
    name: string;
    value: string;
  };  

  const [copied, setCopied] = useState(false);
  const [request, setRequest] = useState('Params');
  const [showToken, setShowToken] = useState(true);
  const [json, setJson] = useState(null);
  const [params, setParams] = useState<Param[]>([]);

  const handleCopy = () => {
      navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => {
          setCopied(false);
      }, 2000);
  };

  const handleFieldChange = (index: number, field: 'name' | 'value', value: string) => {
      if ((field === 'header' || field === 'auth' || field === 'param') && value === '') {
          console.error('Field name must be a non-empty string');
          return;
      }

      if (request === 'Params') {
          const updatedParams = [...params];
          updatedParams[index][field] = value;
          updateParams(updatedParams);
      } else if (request === 'Headers') {
          const updatedHeaders = [...headers];
          updatedHeaders[index][field] = value;
          updateHeaders(updatedHeaders);
      } else if (request === 'Auth') {
          const updatedTokens = [...tokens];
          updatedTokens[index][field] = value;
          updateTokens(updatedTokens);
      }
  };

  const addField = () => {
      if (request === 'Params') {
          const updatedParams = [...params, { name: '', value: '' }];
          setParams(updatedParams);
      } else if (request === 'Headers') {
          const updatedHeaders = [...headers, { name: '', value: '' }];
          updateHeaders(updatedHeaders);
      } else if (request === 'Auth') {
          const updatedTokens = [...tokens, { name: '', value: '' }];
          updateTokens(updatedTokens);
      }
  };

  const deleteField = (index: number) => {
      if (request === 'Params') {
          const updatedParams = [...params];
          updatedParams.splice(index, 1);
          setParams(updatedParams);
      } else if (request === 'Headers') {
          const updatedHeaders = [...headers];
          updatedHeaders.splice(index, 1);
          updateHeaders(updatedHeaders);
      } else if (request === 'Auth') {
          const updatedTokens = [...tokens];
          updatedTokens.splice(index, 1);
          updateTokens(updatedTokens);
      }
  };
  
  const handleBodyChange = (value: any) => {
      updateBody(value);
  };
  
  return (
      <>
        <section className='border-2 border-gray-400 rounded-xl h-full p-5 w-1/2'>
            <p className='mb-2 text-xl font-bold text-white/90'>Request</p>
            <Tabs defaultValue="params" className="w-full mb-2">
                <TabsList className='bg-transparent border border-gray-400'>
                    <TabsTrigger value="params">Params</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                    <TabsTrigger value="auth">Auth</TabsTrigger>
                    <TabsTrigger value="body">Body</TabsTrigger>
                </TabsList>
                <TabsContent className='bg-black/50 p-5 text-white/90 rounded h-full' value="params">
                    <Button variant={'purple'} onClick={addField} className='flex gap-3 mb-3'>
                        <p>Add</p>
                        <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}}/>
                    </Button>
                    {params.map((field, index) => (
                        <div key={index} className='flex items-center gap-3 mb-2'>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={field.name}
                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                className='bg-transparent text-white'
                            />
                            <Input
                                type="text"
                                placeholder="Value"
                                value={field.value}
                                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                                className='bg-transparent text-white'
                            />
                            <FaTrash onClick={() => deleteField(index)} style={{ cursor: 'pointer', color: 'red' }}/>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent className='bg-black/50 p-5 text-white/90 rounded h-full' value="headers">
                    <Button variant={'purple'} onClick={addField} className='flex gap-3 mb-3'>
                        <p>Add</p>
                        <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}}/>
                    </Button>
                    {headers.map((header, index) => (
                        <div key={index} className='flex items-center gap-3 mb-2'>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={header.name}
                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                className='bg-transparent text-white'
                            />
                            <Input
                                type="text"
                                placeholder="Value"
                                value={header.value}
                                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                                className='bg-transparent text-white'
                            />
                            <FaTrash onClick={() => deleteField(index)} style={{ cursor: 'pointer', color: 'red' }}/>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent className='bg-black/50 p-5 text-white/90 rounded h-full' value="auth">
                    <Button variant={'purple'} onClick={addField} className='flex gap-3 mb-3'>
                        <p>Add</p>
                        <CiCirclePlus style={{ width: 25, height: 25, cursor: 'pointer'}}/>
                    </Button>
                    {tokens.map((token, index) => (
                        <div key={index} className='flex items-center gap-3 mb-2'>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={token.name}
                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                className='bg-transparent text-white'
                            />
                            <Input
                                type={showToken ? 'text' : 'password'}
                                placeholder="Value"
                                value={token.value}
                                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                                className='bg-transparent text-white'
                            />
                            {showToken ? (
                                <FaEye onClick={() => setShowToken(false)} style={{ cursor: 'pointer' }}/>
                            ) : (
                                <FaEyeSlash onClick={() => setShowToken(true)} style={{ cursor: 'pointer' }}/>
                            )}
                            <FaTrash onClick={() => deleteField(index)} style={{ cursor: 'pointer', color: 'red' }}/>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent className='bg-black/50 p-5 text-white/90 rounded h-full' value="body">
                    <div className='flex flex-col mb-5'>
                        <div className='flex justify-between'>
                            <label htmlFor="bodyEditor" className='text-lg'>Body</label>
                            <button onClick={handleCopy} className='text-gray-500 hover:text-white transition-all'>
                                {copied ? <FaCheck /> : <FaCopy />}
                            </button>
                        </div>
                        <CodeMirror
                            id="bodyEditor"
                            value={body}
                            height="300px"
                            extensions={[]}
                            onChange={handleBodyChange}
                            theme={tokyoNight}
                            className='border-2 border-gray-400 rounded'
                        />
                    </div>
                </TabsContent>
            </Tabs>
            <ToastContainer />
        </section>
      </>
  )
}

export default Request;
