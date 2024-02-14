import React, { useState } from "react";
import { TextField, Button } from "@mui/material/";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function Login() {
  const [username, setUsername] = useState("");
  const styles = {
    gradientCustom: {
      height: "95vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #dbe6f6)",
    },
  };

  const handleJoin = () => {
    if (username.trim() !== "") {
      socket.emit("join", username);
    }
  };

  return (
    <>
      <div style={styles.gradientCustom}>
        <TextField
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          fullWidth
          label="Username"
          variant="filled"
        />
        <Button onClick={handleJoin} href="/chat" variant="contained">
          Join
        </Button>
      </div>
    </>
  );
}

export default Login;
