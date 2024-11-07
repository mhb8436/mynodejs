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
    });
    socket.on('chat:message', (msg)=> { // receive chat message
      setMessages((prevMessage) => [...prevMessage, msg]);
    });

    return () => {
      socket.off('chat:message'); // 컴포넌트가 unmount 될 때 socket 리스닝 해제 
      socket.off('user:joined');
      socket.off('user:left');
      socket.off('room:joined');
      socket.off('update:users');
      socket.off('update:rooms');
    };
  }, []);
  const sendMessage = (e) => {
    if(message.trim()) {
      socket.emit('chat:message', message); // 3) 
      setMessage('');
    }
  }
  const handleLogin = () => {
    if(username) {
      socket.emit('login', username);
    }
  }
  const handleCreateRoom = () =>{
    if(roomName){
      socket.emit('create:room', roomName);
      setRoomName('');
    }
  }
  return (
    <div className="App">
      {!isLogined ? (
        <div className="login">
          <h2>Login</h2>
          <input
            type="text"
            placeholder='Enter username'
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ): (
        <div className='chat-container'>
          <div className='create-room'>
            <h2>Create Room</h2>
            <input
              type="text"
              placeholder='enter the room'            
              value={roomName}
              onChange={(e)=> setRoomName(e.target.value)}
            />
            <button onClick={handleCreateRoom}>Create Room</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
