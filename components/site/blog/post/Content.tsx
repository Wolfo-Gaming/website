"use client";
import { formatDate } from "@/lib/date";
import type { Post } from "@/types/Blog";
import { User } from "@/types/User";
import { Stack, Flex, Button, Center, Loader, Paper, Text, Avatar, Group, rem, Checkbox } from "@mantine/core";
import { IconChevronRight, IconDownload, IconFile, IconPencil, IconPlus } from "@tabler/icons-react";
import moment from "moment";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import gravatar from "gravatar"
import prettyBytes from "pretty-bytes";
import { components } from "@/lib/components";
export default function Content({ post, user, poster }: { post: Post, user: User | null, poster: User }) {
    
    return (
        <>
            <Stack mx={40} my={40}>
                <Flex mb={10}>
                    <div>
                        <Text fz={30} fw={600} color="white">{post.title}</Text>
                        <Text fz={15} color="gray">{moment(new Date(post.date_updated)).format("MMMM Do YYYY")}</Text>
                    </div>

                    {user ? <Button ml={"auto"} leftSection={<IconPencil />} my={"auto"} component={Link} href={`/blog/${post._id}/edit`}>Edit Post</Button> : <Group ml={"auto"} my={"auto"}>
                        <Avatar
                            src={gravatar.url(poster.email)}
                            radius="xl"

                        />

                        <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                                {poster.firstName} {poster.lastName}
                            </Text>

                            <Text c="dimmed" size="xs">
                                {poster.email}
                            </Text>
                        </div>
                    </Group>}
                </Flex>
                <Paper radius={10} w={"100%"} bg={"#18181d"}>
                    <div style={{ margin: 20 }}>
                        <MDXRemote {...post.content} components={components}/>
                    </div>

                </Paper>
                {post.files.length == 0 ? "" :
                    <Paper radius={10} w={"100%"} bg={"#18181d"} mb={20} mt={10}>
                        <Text fz={30} fw={600} ml={20} mt={10}>Files</Text>
                        <Stack m={10}>
                            {post.files.map(file => {
                                return (
                                    <Paper radius={10} bg={"#0b0b0d"} p={10}>
                                        <Flex>
                                            <Avatar my={"auto"} mx={5} color="blue" size={40}>
                                                <IconFile />
                                            </Avatar>
                                            <Stack gap={0} ml={10}>
                                                <Text fz={20}>{file.name}</Text>
                                                <Text style={{ color: "gray" }} fz={15}>{prettyBytes(file.size as any)}</Text>
                                            </Stack>
                                            <Button variant="subtle" leftSection={<IconDownload />} my="auto" ml={"auto"} component={Link} href={file.src}>
                                                Download
                                            </Button>
                                        </Flex>
                                    </Paper>
                                )
                            })}
                        </Stack>

                    </Paper>}

            </Stack>
        </>
    )
}