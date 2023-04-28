// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './pages/Chat';
// import Chat from './pages/Chat_';
import Login from './pages/Login';
import io, { Socket } from 'socket.io-client';
import { useState } from 'react';

const socket = io('http://3.142.255.223:8000');
// const socket = io('http://localhost:8000');

//const socket = io('http://192.168.1.166:8000');

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <Login socket={socket} />} />
        <Route exact path="/Chat" element={<Chat socket={socket} />} />
      </Routes>
    </Router>
  );

}