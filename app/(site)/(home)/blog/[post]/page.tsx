import Content from '@/components/site/blog/post/Content'
import { getPost } from '@/lib/blog'
import { getUserByEmail, getUserOptional } from '@/lib/session';
import { Post } from '@/types/Blog';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { redirect, useRouter } from 'next/navigation'

export default async function BlogPost({ params }: { params: Params }) {
    if (!params.post) return redirect("/blog");
    const post: Post = await getPost(params.post) as any
    if (!post) return redirect("/blog");
    const user = await getUserOptional();
    const poster = await getUserByEmail(post.user)
    if (!poster) return redirect("/blog");
    return (
        <>
            <Content post={post} user={user} poster={poster} />
        </>
    )
}