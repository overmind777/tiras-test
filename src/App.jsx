import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

import "./App.css";

// Firebase конфігурація
const firebaseConfig = {
  apiKey: "AIzaSyA8KeMnqi2JUQos5z9mPUGwCSeeFeIjVN4",
  authDomain: "tiras-test.firebaseapp.com",
  projectId: "tiras-test",
  storageBucket: "tiras-test.appspot.com",
  messagingSenderId: "790921268840",
  appId: "1:790921268840:web:aca83ecb58f87d53daf5dd",
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const socket = io("https://helloworld-790921268840.us-central1.run.app", {
  transports: ["websocket", "polling"],
});

function App() {
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Запит на дозвіл на сповіщення
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.warn("Notification permission denied.");
      }
    });

    socket.on("connect", () => {
      console.log("Connected to server, socket id: ", socket.id);
      setSocketId(socket.id);
    });

    socket.on("message", (msg) => {
      console.log("Message from server2: ", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("receivedMessage");
    };
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Перевірка перед відправкою
    if (title && textArea) {
      // Get a registration token
      getToken(messaging, {
        vapidKey:
          "BIaqp2Vm9bc56ajpxT6aJYpe-W-arFzwv3pn5k_v231QFTIRvE6cHhU5YMQkik5-SOpePzXiTNXcg-dyFbbPoho",
      }).then((token) => {
        // Send the registration token to your server-side code
        socket.emit("sendMessage", { title, textArea, token });
      });

      setTitle("");
      setTextArea("");
      console.log("Message sent:", { title, textArea });
    } else {
      console.error("Title and textArea must not be empty.");
    }
  };

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
          value={textArea}
          onChange={(e) => {
            setTextArea(e.target.value);
          }}
        ></textarea>
        <button type="submit" onClick={handleOnSubmit}>
          Send
        </button>
      </form>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <h4>{msg.title}</h4>
            <p>{msg.textArea}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
