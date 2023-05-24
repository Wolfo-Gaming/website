import { ThemeProvider } from '@emotion/react';
import { Card, CardContent, CssBaseline, useMediaQuery } from '@mui/material';
import { CookiesProvider, useCookies } from 'react-cookie';
import Footer from '../components/Footer';
import NavBar, { NavBarButton } from '../components/Navbar';
import { darkTheme, lightTheme } from '../lib/theme';
import { getWebContainerInstance } from '../lib/webcontainer';
import { Terminal } from 'xterm';
import React, { useEffect, useState } from 'react';
import { debug } from '../lib/debug';

export function Webcontainers() {
   var [themevariant, setThemevariantState] = useState<"dark" | "light">("dark")
   const [themeCookie, setThemeCookie] = useCookies(['theme-mode']);
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
   var terminalRef = React.useRef<HTMLDivElement>(null)
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
   var term = new Terminal({
      "cursorBlink": true,
   });




   async function boot() {
            //@ts-expect-error
      term.open(document.getElementById("terminal"));
      var instance = await getWebContainerInstance();
      instance.on("error", debug.log)
      var proc = await instance.spawn("jsh")
      proc.output.pipeTo(new WritableStream({
         write(chunk) {
            term.write(chunk)
         }
      }))
      var writer = proc.input.getWriter()
      term.onData((data) => {
         writer.write(data)
      })

   }


   return (
      <CookiesProvider>
         <ThemeProvider theme={themevariant == "dark" ? darkTheme : lightTheme}>
            <CssBaseline />
            <NavBar setThemevariant={setThemevariant} themevariant={themevariant} >
               <NavBarButton href="/test" text="Code" />
               <NavBarButton href="/test" text="Homelab" />
               <NavBarButton href="/test" text="IoT" />
               <NavBarButton href="/test" text="Contact" />
            </NavBar>
            <div style={{ marginTop: 84 }}>
               <div id="terminal" style={{width: "80vw", height: "80vh"}}></div>
            </div>



            <button onClick={boot}>Boot!</button>


            <Footer />
         </ThemeProvider>
      </CookiesProvider>


   );
}