import { createTheme } from "@mui/material";


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#181818',
        },
        secondary: {
            main: '#1565c0',
        },
    },
    "components": {
        MuiButton: {
            "defaultProps": {
                color: "secondary"
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: "600",
                    backgroundColor: "#161616"
                }
            }
        }
    },
    typography: {
        "fontFamily": `monospace, sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
})

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3f51b5',
            
        },
        secondary: {
            main: '#1565c0',
        },
    },
    "components": {
        MuiButton: {

            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: "600",
                }
            },
        },
        MuiTypography: {
            "defaultProps": {
                "color": "black"
            }
        },
        MuiSvgIcon: {
            "defaultProps": {
                sx: { color: "#181818" }
            }
        },
        MuiPaper: {
            "defaultProps": {
                sx: { backgroundColor: "#f5f5f5" }
            }
        }
    },
    typography: {
        "fontFamily": `monospace, sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
})