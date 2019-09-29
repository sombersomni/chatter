import React, {useState} from 'react';
//components
import Login from './components/Login';
import Chatroom from './components/Chatroom';
import logo from './logo.svg';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user && user.loggedin ?
        <Chatroom user={user}/> :
         <Login setUser={setUser}/>
        }
      </header>
    </div>
  );
}

export default App;
