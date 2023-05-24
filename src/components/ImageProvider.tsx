
export function ImageProdiverComponent({ darkImage, lightImage, theme }: { lightImage: string, darkImage: string, theme: "light" | "dark" }) {
    return (
        <img src={theme == "dark" ? darkImage : lightImage} />
    )
}
export function ImageProdiver(theme: string, darkImage: string, lightImage: string) {
    return theme == "dark" ? darkImage : lightImage;
}