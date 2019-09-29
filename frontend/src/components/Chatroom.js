import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
const socket = io(process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/");
export default function Chatroom({user}) {
    const inputRef = useRef('');
    useEffect(() => {
        socket.on('chat message', function(msg){
            console.log(msg);
        })
    })
    function sendMessage(e) {
        e.preventDefault();
        console.log('emitting chat message')
        const { username } = user;
        const msg = inputRef.current.value;
        socket.emit('chat message', { msg, username, timestamp: new Date(Date.now()).toISOString()});
        inputRef.current.value = '';
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <input 
                    type="text"
                    ref={inputRef}
                />
                <button 
                    type="submit"
                    placeholder="Say Hello">Send</button>
            </form>
        </div>
    )
}