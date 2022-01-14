import React from "react";
import ReactDOM from "react-dom";
import Root from "./App";

let REACT_18 = true;
const root = document.getElementById("root") as HTMLDivElement;

if (REACT_18) {
  console.log("REACT_18", REACT_18);
  ReactDOM.createRoot(root).render(
    // <React.StrictMode>
    <Root />
    // </React.StrictMode>
  );
} else {
  ReactDOM.render(
    // <React.StrictMode>
    <Root />,
    // </React.StrictMode>,
    root
  );
}
