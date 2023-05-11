import { Card, CardContent, Grid, ButtonGroup, Button, Paper, SxProps, Theme } from "@mui/material";
import { FC } from "react";
interface MultiViewProps {
    children?: any
}
export const MultiView: FC<MultiViewProps> = ({ children }) => {
    return (
        <Card>
            <CardContent>
                <Grid container direction={"row"} >
                    <ButtonGroup orientation="vertical" sx={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                        ":root": {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
                        }
                    }}>
                        {children}
                    </ButtonGroup>
                    <Paper elevation={0} sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)" }}>Testttt</Paper>
                </Grid>

            </CardContent>
        </Card>
    )
}
interface MultiViewButtonProps {
    enabled?: boolean;
    first?: boolean;
    last?: boolean;
    children?: any
}
export const MultiViewButton: FC<MultiViewButtonProps> = ({ children, enabled, first, last }) => {
    var props: SxProps<Theme> = {
        borderTopRightRadius: 0,
        boxShadow: "none"
    }
    if (enabled) {
        props.backgroundColor = (theme) => theme.palette.mode == "dark" ? "#121212" : "#fff";
        props.color = (theme) => theme.palette.mode == "dark" ? "rgb(255, 255, 255)" : "rgb(44, 56, 126)";
    }
    if (first) props.borderTopRightRadius = 0;
    if (last) props.borderBottomRightRadius = 0;
    return (
        <Button variant="contained" sx={props}>{children}</Button>
    )
}