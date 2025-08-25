import React, { useEffect, useState } from "react";
import Home from "./pages/Home";

function App() {
  const [msg, setMsg] = useState("");

  // Backend test
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then(res => res.text())
      .then(setMsg)
      .catch(err => {
        console.error("Backend fetch error:", err);
        setMsg("Failed to fetch from backend.");
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "1rem" }}>
      <Home backendMsg={msg} />
    </div>
  );
}

export default App;
