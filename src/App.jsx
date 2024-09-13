import { useEffect, useState } from 'react';
import { socket } from 'helpers/socket';

import './App.css';
import { onMessageListener, requestForToken } from 'helpers/firebase';

function App() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    requestForToken()

    onMessageListener()
      .then(payload => {
        console.log('Received push message: ', payload);
      })
      .catch(err => console.log('Failed to receive push message: ', err));
  })

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
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
