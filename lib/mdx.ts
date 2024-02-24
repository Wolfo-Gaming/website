"use server";
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
export async function serializeMD(source: string): Promise<any> {
    return serialize(source, {
        scope: {},
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
            format: 'mdx',
        },
        parseFrontmatter: false,
    })
}