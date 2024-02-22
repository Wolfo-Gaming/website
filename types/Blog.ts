export type Post = {
    date_created: number,
    date_updated: number,
    userId: string,
    image: string,
    title: string,
    description: string,
    content: string,
    files: PostFile,
    id: string
}
export type PostFile = {
    src: string,
    name: string,
    size: string,
    mime: string
}