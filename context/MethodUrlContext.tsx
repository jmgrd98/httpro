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
    aiRequest: string;
    updateMethod: (newMethod: string) => void;
    updateUrl: (newUrl: string) => void;
    updateParams: (newParams: { name: string; value: string }[]) => void;
    updateBody: (newBody: any) => void;
    updateHeaders: (newHeaders: { name: string; value: string }[]) => void;
    updateTokens: (newTokens: { name: string; value: string }[]) => void;
    handleSubmit: () => void;
    updateAiRequest: (newAiRequest: string) => void;
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
    const [body, setBody] = useState<any>(null);
    const [headers, setHeaders] = useState<{ name: string; value: string }[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [response, setResponse] = useState<any>();
    const [message, setMessage] = useState<any>();
    const [tokens, setTokens] = useState<{ name: string; value: string }[]>([]);
    const [aiRequest, setAiRequest] = useState<any>();

    const updateAiRequest = (newAiRequest: string) => {
        setAiRequest(newAiRequest);
    };

    const updateMethod = (newMethod: string) => {
        setMethod(newMethod);
    };

    const updateUrl = (newUrl: string) => {
        setUrl(newUrl);
    };

    const updateTokens = (newTokens: { name: string; value: string }[] = []) => {
        setTokens(newTokens);
    };

    const updateParams = (newParams: { name: string; value: string }[] = []) => {
        setParams(newParams);
    };

    const updateBody = (newBody: any = '') => {
        setBody(newBody);
    };

    const updateHeaders = (newHeaders: { name: string; value: string }[] = []) => {
        setHeaders(newHeaders);
    };

    const flattenResponseData = (response: any) => {
        const flattenObject = (obj: any, parentKey = '') => {
            return Object.keys(obj).reduce((acc: any, key) => {
                const prefixedKey = parentKey ? `${parentKey}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && key === 'data') {
                    Object.assign(acc, flattenObject(obj[key], prefixedKey));
                } else {
                    acc[prefixedKey] = obj[key];
                }
                return acc;
            }, {});
        };

        return flattenObject(response);
    };

    const handleSubmit = async () => {
        if (url === '') {
            setMessage('Enter a URL')
            return;
        }
        try {
            const parsedBody = body ? JSON.parse(body) : null;
            const response: any = await axios.create({
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

            const flattenedResponse = flattenResponseData(response);
            console.log('Response:', flattenedResponse);
            setResponse(flattenedResponse);
            setData(response.data.message ? response.data.message : response.data);
        } catch (error: any) {
            console.error('Error:', error);
            setResponse(error.response);
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
        updateMethod,
        updateUrl,
        updateParams,
        updateBody,
        updateHeaders,
        updateTokens,
        handleSubmit,
        data,
        response,
        message,
        aiRequest,
        updateAiRequest
    };

    return (
        <MethodUrlContext.Provider value={value}>
            {children}
        </MethodUrlContext.Provider>
    );
};
