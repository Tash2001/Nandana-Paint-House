import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar({ setPage }) {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [parameterOpen, setParameterOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo">Paint Shop</div>

      <button className="sidebar-btn" onClick={() => setPage("home")}>
        Home
      </button>

      <button
        className="sidebar-btn"
        onClick={() => setInventoryOpen(!inventoryOpen)}
      >
        Inventory {inventoryOpen ? "▲" : "▼"}
      </button>

      {inventoryOpen && (
        <div className="sidebar-submenu">
          {/* Parameter Tables */}
          <button
            className="sidebar-submenu-btn"
            onClick={() => setParameterOpen(!parameterOpen)}
          >
            Parameter Tables {parameterOpen ? "▲" : "▼"}
          </button>
          {parameterOpen && (
            <div className="sidebar-submenu-nested">
              <button onClick={() => setPage("unit")}>Units</button>
              <button onClick={() => setPage("color")}>Colors</button>
              <button onClick={() => setPage("brand")}>Brands</button>
              <button onClick={() => setPage("category")}>Categories</button>
              <button onClick={() => setPage("subcategory")}>Subcategories</button>
              <button onClick={() => setPage("supplier")}>Suppliers</button>
            </div>
          )}

          {/* Normal Inventory buttons */}
          <button className="sidebar-submenu-btn" onClick={() => setPage("product")}>
            Product Table
          </button>
          <button className="sidebar-submenu-btn" onClick={() => setPage("stock")}>
            Stock Table
          </button>
          <button className="sidebar-submenu-btn" onClick={() => setPage("transaction")}>
            Transactions
          </button>
        </div>
      )}

      <button
        className="sidebar-btn"
        onClick={() => setBillingOpen(!billingOpen)}
      >
        Billing {billingOpen ? "▲" : "▼"}
      </button>

      {billingOpen && (
        <div className="sidebar-submenu">
          <button className="sidebar-submenu-btn" onClick={() => setPage("new-bill")}>
            New Bill
          </button>
          <button className="sidebar-submenu-btn" onClick={() => setPage("credit")}>
            Credit
          </button>
          <button className="sidebar-submenu-btn" onClick={() => setPage("history")}>
            Bill History
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
