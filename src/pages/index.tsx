
import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import Footer from "../components/Footer";
import NavBar, { NavBarButton } from "../components/Navbar";
import { darkTheme, lightTheme } from "../lib/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import AboutCard from "../components/content/AboutCard";
import { CardContentImage, CardLeft, CardRight } from "../components/content/CardContent";
import { Start } from "../components/content/Start";
import { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { debug } from "../lib/debug";
import { ImageProdiver } from "../components/ImageProvider";

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
        <NavBar setThemevariant={setThemevariant} themevariant={themevariant} >
          <NavBarButton href="/test" text="Code"/>
          <NavBarButton href="/test" text="Homelab"/>
          <NavBarButton href="/test" text="IoT"/>
          <NavBarButton href="/test" text="Contact"/>
        </NavBar>
        <Start img={ImageProdiver(themevariant, `/img/rpi-dark.jpg`, `/img/rpi-light.jpg`)} content="Test Content" variant="h2" />
        <Grid direction="row" container sx={{ mt: 4 }}>
          <Grid container xs={11} md={10 / 3} sx={{ mx: "auto", mb: 1 }}>
            <AboutCard image="/img/code.jpg" buttonText="Lees meer" title="Programmeren" description="Begonnen met het programmeren in javascript (Node.js) maar met de tijd mee ook andere talen geleerd zoals Java en C#. Ik ben ook nog talen aan het leren zoals Dart en Python." />
          </Grid>
          <Grid container xs={11} md={10 / 3} sx={{ mx: "auto", mb: 1 }}>
            <AboutCard image="/img/servers.jpg" buttonText="Lees meer" title="Homelab" description="Sinds 2019 draai ik thuis mij eigen servers, hierop staat grootendeels software die ik zelf gemaakt heb maar ik gebruik ook open-source software zoals Homeassistant." />
          </Grid>
          <Grid container xs={11} md={10 / 3} sx={{ mx: "auto", mb: 1 }}>
            <AboutCard image="/img/iot.jpg" buttonText="Lees meer" title="Internet of Things" description="Sinds kort doe ik ook veel met IoT bijvoorbeeld doe ik thuis ons electriciteitsgebruik monitoren met een raspberry pi. Om alle data te kunnen gebruiken om ons huis zuiniger te maken gebruik ik Homeassistant." />
          </Grid>
        </Grid>
        <Footer />
      </ThemeProvider>
    </CookiesProvider>
  )
}
export default Index;
