import React, { useState, useEffect } from "react";
import { socket } from "./socket/socket";

import "./App.styled.js";
import { generateToken, messaging } from "./notifications/firebase";
import { onMessage } from "firebase/messaging";

import {
  Wrapper,
  Form,
  Input,
  TextArea,
  Button,
  List,
  Item,
} from "./App.styled";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      const generatedToken = await generateToken();
      setToken(generatedToken);
    };

    fetchToken();

    onMessage(messaging, (payload) => {
      setMessages((prevMessages) => [...prevMessages, payload.notification]);
    });
  }, []);

  const sendMessage = () => {
    if (title && text) {
      socket.emit("sendMessage", { title, text, token });
      setTitle("");
      setText("");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <Wrapper>
      <Form action="" onSubmit={handleOnSubmit}>
        <Input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextArea
          placeholder="Message"
          name=""
          id=""
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></TextArea>
        <Button type="submit" onClick={handleOnSubmit}>
          Send
        </Button>
        <h2>Received Messages:</h2>
        <List>
          {messages.map((message, index) => (
            <Item key={index}>
              <strong>{message.title}</strong>: {message.body}
            </Item>
          ))}
        </List>
      </Form>
    </Wrapper>
  );
}

export default App;
