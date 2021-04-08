import React, {useState, createContext, useEffect} from 'react';
import {setTheme, getTheme} from '../helpers/app-persistent';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = async () => {
    setIsDark(!isDark);
    await setTheme(isDark);
  };

  /* useEffect(() => {
    async () => {
      const theme = getTheme();
      console.log(theme);
      // setIsDark(theme);
    };
  }, []); */

  return (
    <ThemeContext.Provider value={{isDark, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  );
};
