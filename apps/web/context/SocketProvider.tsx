'use client'
import React, { useCallback, useContext, useEffect, useState } from "react";
import {io} from 'socket.io-client'

interface SocketProviderProps {
    children? :  React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
   // messages: string[];
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const SocketProvider :  React.FC<SocketProviderProps> = ({children}) =>{
 
    const sendMessage : ISocketContext['sendMessage'] = useCallback((msg) => {
         console.log("Send Message",msg);
    },[]);

    useEffect(() => {
        const _socket = io("http://localhost:8000");
        
        return () => {
          _socket.disconnect();
        };
      }, []);    

   return (
    <SocketContext.Provider value={null}>
       {children} 
    </SocketContext.Provider>
   );
};