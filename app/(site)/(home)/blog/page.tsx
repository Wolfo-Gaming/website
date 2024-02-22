import Content from "@/components/site/blog/Content";
import { getUserOptional } from "@/lib/session";
import { Paper, Stack, Image, Flex, Text } from "@mantine/core";

export default async function BlogPosts() {
    const user = await getUserOptional()
    return (
        <>
            <Content user={user} />
        </>
    )
}