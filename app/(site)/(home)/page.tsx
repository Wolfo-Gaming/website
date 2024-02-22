import { BackgroundImage, Button, Center, Flex, Grid, GridCol, Paper, SimpleGrid, Text } from '@mantine/core';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { IconBoxSeam, IconCpu2, IconFileCode } from '@tabler/icons-react';
import Link from 'next/link';
import { GithubIcon } from '@mantinex/dev-icons';
import FeaturePaper from '@/components/FeaturePaper';
export default function HomePage() {
    return (
        <>
            <BackgroundImage src='/img/server.jpg' h={"40rem"} style={{ backdropFilter: "blur(20px)" }}>
                <Center my={"auto"} h={"100%"}>
                    <div style={{ textAlign: "center" }}>
                        <Text fz={50} fw={600}>Test text</Text>
                        <Text mt={20}>description blabla</Text>
                    </div>
                </Center>
            </BackgroundImage>
            <Grid mx={20} h={2000}>
                <GridCol span={4}>
                    <FeaturePaper title='Hardware'
                        component={Link}
                        href="/hardware"
                        icon={<Flex
                            style={{
                                backgroundColor: "var(--mantine-color-orange-filled)",
                                borderRadius: "50%",
                            }}

                        >
                            <IconCpu2
                                style={{
                                    padding: 20,
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                size={75}
                            />
                        </Flex>}>
                        Test
                    </FeaturePaper>
                </GridCol>
                <GridCol span={4}>
                    <FeaturePaper title='Development'
                        component={Link}
                        href="https://github.com/Wolfo-Gaming"
                        icon={<Flex
                            style={{
                                backgroundColor: "var(--mantine-color-teal-filled)",
                                borderRadius: "50%",
                            }}
                        >
                            <IconFileCode
                                style={{
                                    padding: 20,
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                size={75}
                            />
                        </Flex>}>
                        Test
                    </FeaturePaper>
                </GridCol>
                <GridCol span={4}>
                    <FeaturePaper title='Software'
                        component={Link}
                        href="/software"
                        icon={<Flex
                            style={{
                                backgroundColor: "var(--mantine-color-cyan-filled)",
                                borderRadius: "50%",
                            }}
                        >
                            <IconBoxSeam
                                style={{
                                    padding: 20,
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                size={75}
                            />
                        </Flex>}>
                        Test
                    </FeaturePaper>
                </GridCol>
            </Grid>
        </>

    );
}
