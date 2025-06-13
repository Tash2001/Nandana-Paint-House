import React, { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then(res => res.text())
      .then(setMsg)
      .catch(err => {
        console.error("Backend fetch error:", err);
        setMsg("Failed to fetch from backend.");
      });
  }, []);


  return <h1>{msg || "Loading..."}</h1>;
}

export default App;