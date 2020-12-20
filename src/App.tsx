import React, { useState } from "react";
import "./assets/styles/style.css";
import defaultDataset from "./dataset";

const initialState = {
  answers: [],
  chats: [],
  currentId: "init",
  dataset: defaultDataset,
  open: false,
};

const App = () => {
  const [state, setState] = useState(initialState);
  return (
    <section className="c-section">
      <div className="c-box">{state.currentId}</div>
    </section>
  );
};

export default App;
