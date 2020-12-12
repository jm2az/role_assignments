import React from "react";
import "./App.css";
import { AppHeader } from "./AppHeader";
import { Assignments } from "../assignments/Assignments";

function App() {
  return (
    <div className="App">
      <header>
        <AppHeader />
        <Assignments />
      </header>
    </div>
  );
}

export default App;
