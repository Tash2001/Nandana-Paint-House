import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";

function App() {
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState("home");

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

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home backendMsg={msg} />;
      case "parameter":
      case "product":
      case "stock":
      case "transaction":
        return <Inventory page={page} />;
      case "new-bill":
      case "credit":
      case "history":
        return <Billing page={page} />;
      default:
        return <Home backendMsg={msg} />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />
      <div style={{ flex: 1, padding: "1rem", backgroundColor: "#121212", color: "#e5e5e5", minHeight: "100vh" }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;