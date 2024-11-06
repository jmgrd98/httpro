'use client'

import { createContext, useState, useContext } from 'react';
import axios from 'axios';

interface MethodUrlContextType {
    method: string;
    url: string;
    params: { name: string; value: string }[];
    body: any;
    headers: { name: string; value: string }[];
    tokens: { name: string; value: string }[];
    data: any[];
    response: any;
    message: any;
    statusCode: number | null;
    responseBody: any;
    aiRequest: string;
    setMethod: React.Dispatch<React.SetStateAction<string>>;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    setParams: React.Dispatch<React.SetStateAction<{ name: string; value: string }[]>>;
    setBody: React.Dispatch<React.SetStateAction<any>>;
    setHeaders: React.Dispatch<React.SetStateAction<{ name: string; value: string }[]>>;
    setStatusCode: React.Dispatch<React.SetStateAction<number | null>>;
    setResponseBody: React.Dispatch<React.SetStateAction<any>>;
    setTokens: React.Dispatch<React.SetStateAction<{ name: string; value: string }[]>>;
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    setAiRequest: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: () => void;
}

const MethodUrlContext = createContext<MethodUrlContextType | null>(null);

export const useMethodUrlContext = () => {
    const context = useContext(MethodUrlContext);
    if (!context) {
        throw new Error('useMethodUrlContext must be used within a MethodUrlProvider');
    }
    return context;
};

export const MethodUrlProvider: any = ({ children }: any) => {
    const [method, setMethod] = useState<string>('GET');
    const [url, setUrl] = useState<string>('');
    const [params, setParams] = useState<{ name: string; value: string }[]>([]);
    const [body, setBody] = useState<string>('');
    const [headers, setHeaders] = useState<{ name: string; value: string }[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [response, setResponse] = useState<any>();
    const [message, setMessage] = useState<any>();
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [responseBody, setResponseBody] = useState<any>(null);
    const [tokens, setTokens] = useState<{ name: string; value: string }[]>([]);
    const [aiRequest, setAiRequest] = useState<any>();

    const handleSubmit = async () => {
        if (url === '') {
            setMessage('Enter a URL');
            return;
        }
        try {
            const parsedBody = body ? JSON.parse(body) : null;
            const response = await axios({
                method: method,
                url: url,
                params: params.reduce((acc: any, param: any) => {
                    acc[param.name] = param.value;
                    return acc;
                }, {}),
                headers: headers.reduce((acc: any, header: any) => {
                    acc[header.name] = header.value;
                    return acc;
                }, {}),
                data: parsedBody
            });
            setResponse(response);
            setStatusCode(response.status);
            setResponseBody(response.data);
        } catch (error: any) {
            console.error('Error:', error);
            setResponse(error.response);
            setStatusCode(error.response?.status ?? null);
            setResponseBody(error.response?.data ?? null);
            setMessage(error.message);
        }
    };

    const value: MethodUrlContextType = {
        method,
        url,
        params,
        body,
        headers,
        tokens,
        data,
        response,
        message,
        statusCode,
        responseBody,
        aiRequest,
        setMethod,
        setUrl,
        setParams,
        setBody,
        setHeaders,
        setTokens,
        setStatusCode,
        setResponseBody,
        setData,
        setAiRequest,
        handleSubmit
    };

    return (
        <MethodUrlContext.Provider value={value}>
            {children}
        </MethodUrlContext.Provider>
    );
};
