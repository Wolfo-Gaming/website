"use client";


import { FormControlLabel, IconButton, SvgIcon, Switch } from "@mui/material";
import { Box, AppBar, Toolbar, Typography, Button, Container, CssBaseline, Dialog, Slide, Grow } from "@mui/material"
import { useState, forwardRef } from "react";
import { TransitionProps } from '@mui/material/transitions';
import { Email, GitHub, Menu, LinkedIn } from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
const pages = [
  { key: "Blog", href: "/blog" }
];

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function NavBar({ setThemevariant, themevariant, children }: { setThemevariant: (variant: "dark" | "light") => void, themevariant: "dark" | "light", children: any }) {

  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ padding: "10px", margin: 0, backdropFilter: "blur(10px)", backgroundColor: themevariant == "dark" ? "#000000e3" : "#d7d7d787" }}>
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                my: "auto",
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: (theme) => theme.palette.mode == "dark" ? "white" : "black",
                textDecoration: 'none',
              }}
            >
              ROBERT
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
              {children}
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                textAlign: "center",
                mx: "auto"
              }}
            >
              LOGO
            </Typography>


            <Toolbar sx={{ display: "flex", justifyContent: "right" }}>
              <IconButton href="https://github.com/Wolfo-Gaming">
                <LinkedIn />
              </IconButton>
              <IconButton href="https://github.com/Wolfo-Gaming">
                <GitHub />
              </IconButton>
              <IconButton onClick={() => {
                setThemevariant(themevariant == "dark" ? "light" : "dark")
              }}>
                {themevariant == "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton >
            </Toolbar>
            <IconButton sx={{ display: { xs: "flex", md: "none" } }} onClick={() => setOpen(true)}>
              <Menu />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        fullScreen
        fullWidth={true}
        sx={{ height: "fit-content", minHeight: "150px", width: "100vw" }}
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Grow in={true} timeout={{ appear: 0, enter: 1700, exit: 1200 }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              fontFamily: 'monospace',
              mt: 2,
              mb: 2,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textAlign: "center",
              mx: "auto"
            }}
          >
            LOGO
          </Typography>
        </Grow>
        <Grow in={true} timeout={{ appear: 0, enter: 2000, exit: 1200 }}>
          <Button variant="text">Test Button</Button>
        </Grow>
        <Grow in={true} timeout={{ appear: 0, enter: 2700, exit: 1200 }}>
          <Button variant="text" sx={{ mb: 2 }}>Test Button</Button>
        </Grow>
      </Dialog>
    </Box>

  );
}
export function NavBarButton({ text, href }: { text: string, href: string }) {
  return (
    <Button key={text} href={href} sx={{ color: (theme) => theme.palette.mode == "dark" ? "white" : "black", backgroundColor: "rgba(0,0,0,0)" }}>{text}</Button>
  )
}
export default NavBar