import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    async function tryLogin(e) {
        e.preventDefault();
        const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/auth/login" : "/auth/login";
        try {
            const res = await axios.post(url, { username, password })
            const { data } = res;
            console.log(data);
        } catch(err) {
            console.log(err);
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
        </div>
    )
}