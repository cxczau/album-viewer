import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Carousel from "./components/Carousel";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <Carousel />
      </header>
    </div>
  );
}

export default App;