"use client";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

export default function Footer() {
    return (
        <AppBar position="static" elevation={0} component="footer" color="default" sx={{backgroundColor: (theme) => theme.palette.mode == "dark" ?"#0e0e0e":"#d2d2d2"}}>

            <Grid container direction={"row"} sx={{ mt: 2, mb: 2 }}>
                <Grid item display="flex" xs={4}>
                    
                </Grid>
                <Grid item display="flex" justifyContent="center" xs={4}>
                    <Toolbar>
                        <Typography variant="caption"><a href="https://github.com/Wolfo-Gaming/website">Broncode</a> © 2023 Robert de Leeuw</Typography>
                    </Toolbar>

                </Grid>
                <Grid item display="flex" justifyContent="flex-end" xs={4}>
                    <Toolbar sx={{mr:2}}>
                        <IconButton href="https://github.com/Wolfo-Gaming">
                            <LinkedIn />
                        </IconButton>
                        <IconButton href="https://github.com/Wolfo-Gaming">
                            <GitHub />
                        </IconButton>
                    </Toolbar>

                </Grid>
            </Grid>


        </AppBar>
    )
}