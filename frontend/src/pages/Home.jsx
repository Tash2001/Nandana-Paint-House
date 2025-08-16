import React from "react";

function Home({ backendMsg }) {
  return (
    <div>
      <h1>Welcome to Nandana Paint Shop Inventory System</h1>
      <p>Backend says: {backendMsg}</p>
    </div>
  );
}

export default Home;
