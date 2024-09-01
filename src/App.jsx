// import React from "react";
import Attendence from "./components/Attendence/Attendence.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { themeContext } from "./context/DarkModeContext.jsx";
import { useContext } from "react";
import "./index.css";

function App() {
  const { theme } = useContext(themeContext);

  return (
    <div className="main--app--div" data-theme={theme}>
      <Navbar />
      <Attendence />
    </div>
  );
}

export default App;

//Functionality to add=>
//--use custom hook to manage all the fetching
