import React, {useState, useEffect} from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io("http://localhost:3030/", {
  withCredentials: true,
}); // 1) 

function App() {
  const [messages, setMessages] = useState([]); // 입력된 메시지 목록
  const [message, setMessage] = useState(""); // 전송할 메시지 

  useEffect(()=>{
    // server : io.emit('chat:message', msg)
    socket.on('chat:message', (msg)=> { // 6) 
      setMessages((prevMessage) => [...prevMessage, msg]);
    });

    return () => {
      socket.off('chat:message'); // 컴포넌트가 unmount 될 때 socket 리스닝 해제 
    };
  }, []);
  const sendMessage = (e) => {
    if(message.trim()) {
      socket.emit('chat:message', message); // 3) 
      setMessage('');
    }
  }
  return (
    <div className="App">
      <h1>Message List</h1>      
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <h1>Send Message</h1>
      <input
        id="input"
        type="text"
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
      >
      </input>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
