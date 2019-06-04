import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { FliptDisplayIfEnabled, FliptEnabledDisabled } from "./flipt";
import { NewContactForm, OldContactForm } from "./contactForm";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <FliptDisplayIfEnabled flag="SHOW_NAME">
        <h5>Hello, my name is Chris.</h5>
      </FliptDisplayIfEnabled>
      <FliptEnabledDisabled
        flag="SHOW_NEW_CONTACT_FORM"
        enabled={<NewContactForm />}
        disabled={<OldContactForm />}
      />
    </div>
  );
}

export default App;
