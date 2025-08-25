// src/components/Sidebar.jsx
import React from "react";
import "./Sidebar.css";

function Sidebar({ setPage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Paint Shop</h2>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <h3>Billing</h3>
          <button onClick={() => setPage("new-bill")}>New Bill</button>
          <button onClick={() => setPage("credit")}>Credit</button>
          <button onClick={() => setPage("history")}>Bill History</button>
        </div>

        <div className="sidebar-section">
          <h3>Inventory</h3>
          <button onClick={() => setPage("parameters")}>Parameter Tables</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("stock")}>Stock</button>
          <button onClick={() => setPage("transactions")}>Transactions</button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
