'use client'

import { useEffect } from 'react';
import { useMethodUrlContext } from '../context/MethodUrlContext';
import { Badge } from './ui/badge';

const statusTextMap: { [statusCode: number]: string } = {
  100: "Continue",
  101: "Switching Protocols",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
};

function Response() {
  const { 
    response,
    message,
    responseBody,
    setResponseBody, 
    etStatusCode,
    statusCode 
  } = useMethodUrlContext();

  useEffect(() => {
    setResponseBody(responseBody);
  }, [responseBody]);

  const checkResponseMethod = () => {
    if (response?.status >= 200 && response?.status < 300) {
      return 'outlineSuccess';
    } else if (response?.status >= 300 && response?.status < 400) {
      return 'outlineAlert';
    } else if (response?.status >= 400 && response?.status < 500) {
      return 'outlineDestructive';
    } else {
      return 'outline';
    }
  }

  const getStatusText = (statusCode: any) => {
    return statusTextMap[statusCode] || 'Unknown Status';
  }

  const renderJson = (data: any) => {
    if (typeof data === 'string') {
      return <span style={{ color: '#A9A9A9' }}>&quot;{data}&quot;</span>;
    }
    if (typeof data === 'number' || typeof data === 'boolean') {
      return <span style={{ color: '#FF4500' }}>{data.toString()}</span>;
    }
    if (Array.isArray(data)) {
      return (
        <span>
          [
          <ul style={{ listStyleType: 'none', paddingLeft: '1.5rem' }}>
            {data.map((item, index) => (
              <li key={index}>{renderJson(item)}</li>
            ))}
          </ul>
          ]
        </span>
      );
    }
    if (typeof data === 'object' && data !== null) {
      return (
        <span>
          {'{'}
          <ul style={{ listStyleType: 'none', paddingLeft: '1.5rem' }}>
            {Object.keys(data).map((key, index) => (
              <li key={index}>
                <span style={{ color: '#00BFFF' }}>&quot;{key}&quot;</span>: {renderJson(data[key])}
              </li>
            ))}
          </ul>
          {'}'}
        </span>
      );
    }
    return null;
  }
  
  return (
      <section className='border-2 border-gray-400 rounded-xl h-full max-w-full p-5 w-1/2'>
          <p className='mb-2 text-xl font-bold text-white/90'>Response</p>
          <Badge 
            variant={checkResponseMethod()}
            className={'my-3 p-2'}
          >
            {statusCode} {getStatusText(statusCode)}
          </Badge>
          <div className='bg-black/50 p-5 text-white/90 rounded h-[400px]'>
              <pre>{renderJson(responseBody)}</pre>
          </div>
      </section>
  );
}

export default Response;
