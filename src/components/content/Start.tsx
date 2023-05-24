import { Button, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

export function Start({ img, content, variant }: { img: string, content: string, variant?: Variant }) {
    return (

        <div style={{ position: "relative", textAlign: "center" }}>
            <img src={img} style={{ zIndex: 0, width: "100vw", height: "60vh", objectFit: "cover" }}></img>
            <div style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%,-50%)" }}>
                <Typography variant={variant ?? "h1"}>{content}</Typography>
            </div>
        </div>
    )
}