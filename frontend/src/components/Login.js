import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login({ setUser }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    async function tryLogin(e) {
        e.preventDefault();
        const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/auth/login" : "/auth/login";
        try {
            const res = await axios.post(url, { username, password })
            const { data } = res;
            console.log('user loggedin', data);
            setUser(data);
            setMessage('');
        } catch(err) {
            console.log(err);
            setMessage(err.message);
        }
            

    }
    return (
        <div>
            <form onSubmit={tryLogin}>
                <input 
                    type="text" 
                    value={username} 
                    placeholder="Enter your username"
                    onChange={e => setUsername(e.target.value)} />
                <input 
                    type="password" 
                    value={password} 
                    placeholder="Enter your password" 
                    onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <div>
                {message}
            </div>
        </div>
    )
}