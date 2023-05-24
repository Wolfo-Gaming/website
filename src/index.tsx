import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages';
import { Test } from './pages/test';

import { ThemeProvider } from "@mui/material/styles";

import { darkTheme, lightTheme } from "./lib/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { debug } from "./lib/debug";
import { Webcontainers } from './pages/webcontainers';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



export function Main() {
  var [themevariant, setThemevariantState] = useState<"dark" | "light">("dark")
  const [themeCookie, setThemeCookie] = useCookies(['theme-mode']);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  function setThemevariant(variant: "dark" | "light") {
    debug.log("Set theme to " + (variant == "dark" ? "🌑" : "🔆"))
    setThemevariantState(variant)
    setThemeCookie("theme-mode", variant, {
      "maxAge": 3600,
      sameSite: "none"
    })
  }

  // if no memo is used causes infite render
  React.useMemo(() => {
    if (themeCookie["theme-mode"]) {
      setThemevariant(themeCookie["theme-mode"])
    } else {
      if (prefersDarkMode) {
        setThemevariant("dark")
      } else {
        setThemevariant("light")
      }
    }
  }, [prefersDarkMode])

  return (
    <CookiesProvider>
      <ThemeProvider theme={themevariant == "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route index element={<Index />} />
              <Route path="/test" element={<Test />} />
              <Route path="/webcontainers" element={<Webcontainers />} />
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </ThemeProvider>
    </CookiesProvider>
  )
}
export default Index;


root.render(
  <Main />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
