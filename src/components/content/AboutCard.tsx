"use client";

import { Card, CardMedia, CardContent, CardActions, Typography, Button, Fade } from "@mui/material";

export default function AboutCard({ title, description, buttonText, onClick, image }: { title: string, description: string, buttonText: string, onClick?: React.MouseEventHandler<HTMLButtonElement>, image: string }) {
  return (
    <>
      <Fade in={true}>
        <Card sx={{ minWidth: "100%" }}>
          <CardMedia
            sx={{ height: 220 }}
            image={image}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions >
            <Button fullWidth variant="contained" color="secondary" onClick={onClick}>{buttonText}</Button>
          </CardActions>
        </Card>
      </Fade>
    </>
  )
}