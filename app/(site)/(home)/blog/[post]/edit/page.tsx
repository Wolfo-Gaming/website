import Content from "@/components/site/blog/post/edit/Content";
import { getPost } from "@/lib/blog";
import getUser, { getUserByEmail } from "@/lib/session";
import { Post } from "@/types/Blog";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";

export default async function EditPost({ params }: { params: Params }) {
    if (!params.post) return redirect("/blog");
    const post: Post = await getPost(params.post) as any
    if (!post) return redirect("/blog");
    const user = await getUser();
    const poster = await getUserByEmail(post.user)
    if (!poster) return redirect("/blog");
    return (
        <>
            <Content user={user} post={post} poster={poster} />
        </>
    )
}