import React from "react";
import Divider from '@mui/material/Divider';
import Carousel from "./components/Carousel";
import UserForm from "./components/UserForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Carousel />
        <Divider />
        <UserForm />
      </header>
    </div>
  );
}

export default App;