import React, {useState, useEffect} from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io("http://localhost:3030/", {
  withCredentials: true,
}); // 1) 

function App() {
  const [username, setUsername] = useState('');
  const [isLogined, setIsLogined] = useState(false); 
  const [roomName, setRoomName] = useState(''); // create 
  const [currentRoom, setCurrentRoom] = useState(''); // join room 
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);  
  const [messages, setMessages] = useState([]); // 입력된 메시지 목록
  const [message, setMessage] = useState(""); // 전송할 메시지 

  useEffect(()=>{    
    socket.on('login:success', (data)=> { // login success 
      setIsLogined(true);
      setRooms(data.rooms);
    });
    socket.on('room:created', (room)=> { // room created 
      setRooms((prevRooms) => [...prevRooms, room]);
    });
    socket.on('room:joined', (room)=>{ // room joined 
      alert(`joined room : ${room}`);
      setCurrentRoom(room);
    });
    socket.on('update:rooms', (rooms)=> { // other room update 
      setRooms(rooms);
    });
    socket.on('update:users', (users)=> {
      setUsers(users);
    });
    socket.on('user:joined', (user)=> {
      setMessage((prevMessage)=> [...prevMessage, `${user} joined this room`]);
    });
    socket.on('user:left', (user)=> {
      setMessage((prevMessage)=> [...prevMessage, `${user} left this room`]);
    })
    socket.on('chat:message', (msg)=> { // receive chat message
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
