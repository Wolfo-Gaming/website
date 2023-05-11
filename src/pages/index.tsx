
import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { darkTheme, lightTheme } from "../lib/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import AboutCard from "../components/content/AboutCard";
import { CardContentImage, CardLeft, CardRight } from "../components/content/CardContent";
import { Start } from "../components/content/Start";
import { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { debug } from "../lib/debug";

export function Index() {
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
        <NavBar setThemevariant={setThemevariant} themevariant={themevariant} />
        <Start img={`/img/rpi-${themevariant}.jpg`} buttonText="Read More" content="Test Content" variant="h2" />
        <Typography display="flex" justifyContent="center" sx={{ mt: 2, fontWeight: "medium" }} variant="h3">About me</Typography>
        <Grid direction="row" container sx={{ mt: 4 }}>
          <Grid container xs={11} md={10 / 3} sx={{ mx: "auto", mb: 1 }}>
            <AboutCard image="/img/mountains.jpg" buttonText="Read more" title="Test" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
          </Grid>
          <Grid container xs={11} md={10 / 3} sx={{ mx: "auto", mb: 1 }}>
            <AboutCard image="/img/mountains.jpg" buttonText="Read more" title="Test" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
          </Grid>
          <Grid container xs={11} md={10 / 3} sx={{ mx: "auto", mb: 1 }}>
            <AboutCard image="/img/mountains.jpg" buttonText="Read more" title="Test" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
          </Grid>
        </Grid>
        <CardLeft url="/img/mountains.jpg" content="Test" />
        <CardRight url="/img/mountains.jpg" content="Test" />
        <CardContentImage url="/img/mountains.jpg" content="Test" />
        <Footer />
      </ThemeProvider>
    </CookiesProvider>
  )
}
export default Index;
