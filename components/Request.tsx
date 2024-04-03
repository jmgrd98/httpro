'use client'

import { useEffect, useState } from 'react';
import { FaCopy, FaCheck, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { CiCirclePlus } from "react-icons/ci";
import { useMethodUrlContext } from '../context/MethodUrlContext';
import CodeEditor from '@uiw/react-textarea-code-editor';
import CodeMirror from '@uiw/react-codemirror'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdKey } from "react-icons/io";
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Input } from './ui/input';

function Request() {
    const { 
        // params,
        headers,
        tokens,
        updateParams,
        updateHeaders,
        body,
        updateBody,
        updateTokens,
        aiRequest } = useMethodUrlContext();
  
    const [copied, setCopied] = useState(false);
    const [request, setRequest] = useState('Params');
    const [showToken, setShowToken] = useState(true);
    const [json, setJson] = useState(null);
    const [params, setParams] = useState([{ name: '', value: '' }]);


    // useEffect(() => {
    //     if (aiRequest) {
    //         const startIndex = aiRequest.content.indexOf('{');
    //         const endIndex = aiRequest.content.lastIndexOf('}') + 1;
    //         const extractedJson = aiRequest.content.substring(startIndex, endIndex);

    //         try {
    //             const parsedJson = JSON.parse(extractedJson);
    //             setJson(JSON.stringify(parsedJson, null, 2));
    //         } catch (error) {
    //             console.error('Error parsing JSON:', error);
    //         }
    //     }
    // }, [aiRequest]);
    const handleCopy = () => {
        navigator.clipboard.writeText(body);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

const handleFieldChange = (index: number, field: string, value: string) => {
      if ((field == 'header' || field == 'auth' || field == 'param') && value === '') {
        console.error('Header name must be a non-empty string');
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
      setParams(updatedParams); // Update params state
  } else if (request === 'Headers') {
      const updatedHeaders = [...headers, { name: '', value: '' }];
      updateHeaders(updatedHeaders); // Update headers state using updateHeaders function
  } else if (request === 'Auth') {
      const updatedTokens = [...tokens, { name: '', value: '' }];
      updateTokens(updatedTokens); // Update tokens state using updateTokens function
  }
};

const deleteField = (index: number) => {
  if (request === 'Params') {
      const updatedParams = [...params];
      updatedParams.splice(index, 1);
      setParams(updatedParams); // Update params state
  } else if (request === 'Headers') {
      const updatedHeaders = [...headers];
      updatedHeaders.splice(index, 1);
      updateHeaders(updatedHeaders); // Update headers state using updateHeaders function
  } else if (request === 'Auth') {
      const updatedTokens = [...tokens];
      updatedTokens.splice(index, 1);
      updateTokens(updatedTokens); // Update tokens state using updateTokens function
  }
};

  
    const handleBodyChange = (value: any) => {
        updateBody(value);
    };
  
    return (
      <>
        <section className='border-2 border-gray-400 rounded-xl h-full p-5 w-1/2'>
            <p className='mb-2 text-xl font-bold text-white/90'>Request</p>
            <div className='min-w-[120px] max-w-[120px]'>
                
            </div>
  
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
                              className='p-2 rounded'
                              type='text'
                              placeholder='name'
                              value={field.name}
                              onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                          />
                          <Input
                              className='p-2 rounded'
                              type='text'
                              placeholder='value'
                              value={field.value}
                              onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                          />
                          <FaTrash 
                            onClick={() => deleteField(index)} 
                            className="text-red-500 w-10 h-10 cursor-pointer hover:text-red-500/50"
                          />
                      </div>
                      ))}
                    
                    
                        
                    </TabsContent>
                    <TabsContent value="headers">Change your password here.</TabsContent>
                    <TabsContent value="auth">Change your password here.</TabsContent>
                    <TabsContent value="body">
                    <div className='mt-5  p-3 rounded-xl h-[400px] max-h-[400px] relative'>
                      <CodeMirror
                          value={aiRequest ? json : body}
                          theme={tokyoNight}
                          placeholder="Write your JSON here"
                          onChange={(e: any) => handleBodyChange(e.target.value)}
                          // padding={15}
                          style={{
                              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                          }}
                      />
                      <button onClick={handleCopy} className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2">
                          {copied ? <FaCheck /> : <FaCopy />}
                      </button>
                  </div>
                    </TabsContent>
                  </Tabs>

            
        </section>

        <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
      </>
    );
}

export default Request;