// src/pages/Home.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Home.css";
import Product from "./Product";

function Home() {
  const [page, setPage] = useState("welcome");

  const renderPage = () => {
    switch (page) {
      case "new-bill":
        return <h2>New Bill Page</h2>;
      case "credit":
        return <h2>Credit Page</h2>;
      case "history":
        return <h2>Bill History Page</h2>;
      case "parameters":
        return <h2>Parameter Tables</h2>;
      case "products":
        return <Product />;
      case "stock":
        return <h2>Stock</h2>;
      case "transactions":
        return <h2>Transactions</h2>;
      default:
        return <h2>Welcome! Please select an option.</h2>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar setPage={setPage} />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default Home;
