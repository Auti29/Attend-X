import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const themeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? "dark" : "light";

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}

//proptypes
ThemeContextProvider.propTypes = {
  children: PropTypes.node,
};
