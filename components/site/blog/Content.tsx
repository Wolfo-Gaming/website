"use client";
import { getPosts } from "@/lib/blog";
import { Post } from "@/types/Blog";
import { User } from "@/types/User";
import { Stack, Paper, Flex, Text, Image, Button, Loader, Center } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Content({ user }: { user: User | null }) {
    const [posts, setPosts] = useState<Post[]>([])
    useEffect(() => {
        getPosts().then((posts) => {
            setPosts(posts);
        })
    }, [])
    return (
        <Stack mx={40} my={40}>
            <Flex mb={10}>
                <Text fz={30} fw={600} color="white">Blog Posts</Text>
                {user ? <Button ml={"auto"} leftSection={<IconPlus />} color="green" my={"auto"}>Create Post</Button> : ""}
            </Flex>
            {posts.length == 0 ? <Center><Loader /></Center> : <>
                {posts.map(post => {
                    return (
                        <Paper radius={10} bg={"#18181d"}>
                            <Flex>
                                <Image style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} src={post.image} h={150} w={240} />
                                <Stack ml={20} my={"auto"} gap={10}>
                                    <Text fw={500} fz={30}>{post.title}</Text>
                                    <Text style={{ color: "gray" }}>{post.description}</Text>
                                </Stack>

                            </Flex>
                        </Paper>
                    )
                })}
            </>}

        </Stack>
    )
}