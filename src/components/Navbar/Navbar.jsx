import { useContext } from "react";
import { themeContext } from "../../context/DarkModeContext";
import "./Navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useContext(themeContext);
  return (
    <nav className="navbar" data-theme={theme}>
      <img
        className="navbar--logo"
        src={
          theme === "dark"
            ? "src/assets/attendX--logo--dark.png"
            : "src/assets/logo.png"
        }
        alt="ERR!"
      />
      <div className="mode--switch">
        <h4 style={{ fontSize: "20px" }}>🌗</h4>
        <label>
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <span className="round slider"></span>
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
