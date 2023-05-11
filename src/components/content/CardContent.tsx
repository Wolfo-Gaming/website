import { Grid, Typography, CardMedia, Box, Card } from "@mui/material";

function CardLeft({ url, alt, content }: { url: string, alt?: string, content: string }) {
    return (
        <Card sx={{ mx: 5, mt: 4 }}>
            <Grid container direction={"row"} sx={{ mt: 3, mb: 3 }}>
                <Grid item xs={6}>
                    <Box sx={{ mx: 5, mt: 3 }}>
                        <Typography variant="h3" sx={{ fontWeight: 'medium', mb: 2 }}>Test1</Typography>
                        <Typography>
                            {content}
                        </Typography>
                    </Box>

                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ mr: 3 }}>
                        <CardMedia
                            component="img"
                            image={url}
                            alt={alt ?? ""} />
                    </Card>

                </Grid>
            </Grid>
        </Card>

    )
}

function CardRight({ url, alt, content }: { url: string, alt?: string, content: string }) {
    return (
        <Grid container direction={"row"} sx={{ mt: 4, mb: 2 }}>
            <Grid item xs={6}>
                <Card sx={{ mx: 5 }}>
                    <CardMedia
                        component="img"
                        image={url}
                        alt={alt ?? ""} />
                </Card>

            </Grid>
            <Grid item xs={6}>
                <Box sx={{ mx: 5, mt: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'medium', mb: 2 }}>Test2</Typography>
                    <Typography>
                        {content}
                    </Typography>
                </Box>

            </Grid>
        </Grid>
    )
}
function CardContentImage({ url, content }: { url: string, content: string }) {
    return (
        <Card sx={{ mx: 5, mt: 4, backgroundImage: `url(${url})`, backgroundPosition: "center", mb: 2 }}>
            <Grid container direction={"row"} sx={{ mt: 3, mb: 3 }}>
                <Grid item xs={6}>
                    <Box sx={{ mx: 5, mt: 3 }}>
                        <Typography variant="h3" sx={{ fontWeight: 'medium', mb: 2 }}>Test1</Typography>
                        <Typography>
                            {content}
                        </Typography>
                    </Box>

                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>
        </Card>

    )
}
export {
    CardLeft,
    CardRight,
    CardContentImage
}