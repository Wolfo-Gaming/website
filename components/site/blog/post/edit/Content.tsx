"use client";

import { Post } from "@/types/Blog";
import { User } from "@/types/User";
import { Avatar, Button, Checkbox, Flex, Grid, GridCol, Group, MultiSelect, Paper, Stack, Tabs, TabsList, TabsPanel, TabsTab, Text, TextInput } from "@mantine/core";
import Editor from '@monaco-editor/react';
import loader from '@monaco-editor/loader';
import { IconDeviceDesktop, IconDeviceFloppy, IconMessageCircle, IconPencil, IconPhoto, IconSettings } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { useEffect, useState } from "react";
import { components } from "@/lib/components";
import { serializeMD } from "@/lib/mdx";
import { initializeMonacoMdx } from '@mdx-js/monaco'
import { setPost } from "@/lib/blog";
import { notifications } from "@mantine/notifications";
export default function Content({ post, user, poster }: { post: Post, user: User | null, poster: User }) {
    const [content, setContent] = useState(post)
    const [compiledContent, setCompiledContent] = useState<any>()

    loader.init().then((monaco) => {
        monaco.editor.defineTheme("dark2", {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#18181d',
            },
        })
    });
    useEffect(() => {
    
        serializeMD(post.content).then((s) => {
       
            setCompiledContent(s)
        }).catch(console.error)
    }, [])
    return (
        <>
            <Stack mx={40} my={40}>
                <Flex mb={10}>
                    <div>
                        <Text fz={30} fw={600} color="white">Edit Post</Text>
                    </div>

                    <Button ml={"auto"} leftSection={<IconDeviceFloppy />} my={"auto"} component={Link} href={`/blog/${post._id}/edit`} disabled={content == post} onClick={() => {
                        setPost(post._id, content).then(() => {
                            notifications.show({
                                title: "Saved Post",
                                message: "Successfully saved Post!",
                                color: "green"
                            })
                        }).catch(() => {
                            notifications.show({
                                title: "Error",
                                message: "Error while saving Post",
                                color: "red"
                            })
                        });
                    }}>Save Post</Button>
                </Flex>
                <Paper p={10} bg={"#18181d"}>
                    <Tabs defaultValue="editor">
                        <TabsList mb={10}>
                            <TabsTab value="editor" leftSection={<IconPencil />}>
                                Editor
                            </TabsTab>
                            <TabsTab value="preview" leftSection={<IconDeviceDesktop />}>
                                Preview
                            </TabsTab>
                            <TabsTab value="details" leftSection={<IconSettings />}>
                                Post Details
                            </TabsTab>
                        </TabsList>

                        <TabsPanel value="editor">
                            <Editor defaultValue={post.rawcontent ?? ""} language="markdown" theme="dark2" height={600} onChange={(value) => {
                                if (value) {
                                    
                                    serializeMD(value).then((s) => {
                                        var news = { ...content, rawcontent: value, content: s }
                                        setContent(news);
                                    }).catch(console.error)
                                }
                            }} />
                        </TabsPanel>

                        <TabsPanel value="preview">
                            {compiledContent ? <MDXRemote {...content.content} components={components} /> : ""}
                        </TabsPanel>

                        <TabsPanel value="details">
                            <Grid columns={2}>
                                <GridCol span={1}>
                                    <TextInput label="Title" required defaultValue={post.title} onChange={(ev) => {
                                        var news = { ...content, title: ev.currentTarget.value }
                                        setContent(news);
                                    }} />
                                </GridCol>
                                <GridCol span={1}>
                                    <TextInput label="Description" required defaultValue={post.description} onChange={(ev) => {
                                        var news = { ...content, description: ev.currentTarget.value }
                                        setContent(news);
                                    }} />
                                </GridCol>
                                <GridCol span={1} display={"flex"}>
                                    <Checkbox label="Public" disabled my={"auto"} onChange={() => {

                                    }} />
                                </GridCol>
                                <GridCol span={1}>
                                    <MultiSelect label="Tags" disabled onChange={() => {

                                    }} />
                                </GridCol>
                            </Grid>
                        </TabsPanel>
                    </Tabs>

                </Paper>
            </Stack>

        </>
    )
}