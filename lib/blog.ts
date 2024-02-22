"use server";

import { Post } from "@/types/Blog";
import { connectToDatabase } from "./database";
import { ObjectId } from "mongodb";

export async function getPosts(): Promise<Post[]> {
    const { db } = await connectToDatabase()
    const posts = await db.collection("posts").find({}).toArray();
    return posts.map(post => {
        //@ts-expect-error
        post._id = post._id.toString()
        return post
    }) as any
}
export async function getPost(id: string) {
    const { db } = await connectToDatabase()
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    if (!post) return null;
    //@ts-expect-error
    post._id = post._id.toString()
    return post;
}