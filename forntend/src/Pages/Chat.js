import React, { useState, useEffect } from "react";
import "./index.css";
import { TextField, Button } from "@mui/material/";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const styles = {
  Container: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  chat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    marginTop: "10px",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
function Chat(props) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.on("message", (message) => {
      setChat([...chat, message]);
    });
    console.log(chat)
  }, [chat]);
  const handleMessageSend = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      console.log(message)
      setMessage("");
    }
  };

  return (
    <div style={styles.Container}>
      <div style={styles.chat}>
        {chat.map(() => {
          return (
            <>
              <div style={styles.left}>
                <div></div>
                <div className="container">
                  <div className="arrow">
                    <div className="outer"></div>
                    <div className="inner"></div>
                  </div>
                  <div className="message-body">
                    <p>right</p>
                  </div>
                </div>
                <div></div>
                <div style={styles.right}>
                  <div className="container">
                    <div className="arrow">
                      <div className="outer"></div>
                      <div className="inner"></div>
                    </div>
                    <div className="message-body">
                      <p>left</p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </>
          );
        })}
        <TextField
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          fullWidth
          value={message}
          placeholder="Type a message"
          multiline
          rows={2}
        />
        <Button onClick={handleMessageSend} variant="contained">
          Send message
        </Button>
      </div>
    </div>
  );
}

export default Chat;
