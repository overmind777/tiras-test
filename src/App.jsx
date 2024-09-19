import React,{ useState, useEffect } from 'react';
import { socket } from './socket/socket';

import './App.css';
import { generateToken, messaging } from './notifications/firebase';
import { onMessage } from 'firebase/messaging';

function App() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      const generatedToken = await generateToken();
      setToken(generatedToken);
    };

    fetchToken();

    onMessage(messaging, payload => {
      console.log('Отримано повідомлення : ', payload);
      setMessages(prevMessages => [...prevMessages, payload.notification]);
    });

    socket.on('connect', socket => {
      console.log('Connected to server, socket id: ', socket);
    });
  }, []);

  const sendMessage = () => {
    if (title && text) {
      socket.emit('sendMessage', { title, text, token });
      setTitle('');
      setText('');
      setToken('');
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <div className="wrapper">
      <form action="" className="form" onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          name=""
          id=""
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button type="submit" onClick={handleOnSubmit}>
          Send
        </button>
      </form>
      <h2>Received Messages:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.title}</strong>: {message.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
