"use server";

import { Post } from "@/types/Blog";
import { connectToDatabase } from "./database";
import { ObjectId } from "mongodb";
import { serializeMD } from "./mdx";

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
    var post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    if (!post) return null;
    //@ts-expect-error
    post._id = post._id.toString()
    return { ...post, content: await serializeMD(post.content), rawcontent: post.content };
}
export async function setPost(id: string, post: Post) {
    const { db } = await connectToDatabase()
    //@ts-expect-error
    delete post._id;
    post.content = post.rawcontent;
    //@ts-expect-error
    delete post.rawcontent;
    const res = await db.collection("posts").updateOne({ _id: new ObjectId(id) }, { $set: post });
    console.log(res)
    if (!res.acknowledged) throw new Error("Request not acknowledged");
    if (res.matchedCount == 0) throw new Error("No documents found with " + id);
    return;
}