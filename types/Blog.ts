export type Post = {
    date_created: number,
    date_updated: number,
    user: string,
    image: string,
    title: string,
    description: string,
    content: any,
    files: PostFile[],
    _id: string,
    rawcontent: string
}
export type PostFile = {
    src: string,
    name: string,
    size: string,
    mime: string
}