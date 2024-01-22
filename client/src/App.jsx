import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:5000");
  const [message, setMessage] = useState("");
  const [joinroom, setJoinroom] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", joinroom);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message, joinroom });
  };
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setReceiveMessage(data.message);
    });
  }, [socket]);
  return (
    <main>
      <input
        onChange={(e) => setJoinroom(e.target.value)}
        type="number"
        placeholder="Enter room number"
      />
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Message..."
      />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMessage}>Send Message</button>
      <h2>{receiveMessage}</h2>
    </main>
  );
};

export default App;
