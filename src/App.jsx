import { useState } from 'react';
import { socket } from 'socket/socket';

import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (title && text) {
      socket.emit('sendMessage', { title, text });
      setTitle('');
      setText('');
    }
  };

  const hanleSubmit = e => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="App">
      <h1>Send message</h1>
      <form className="form" onSubmit={hanleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          name=""
          id=""
          placeholder="Message"
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        ></textarea>
      </form>
    </div>
  );
}

export default App;
