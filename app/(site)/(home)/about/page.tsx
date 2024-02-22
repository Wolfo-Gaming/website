import { BackgroundImage, Center, Paper, Stack, Avatar, Grid, Anchor, Card, Divider, Timeline, Text, GridCol, TimelineItem } from "@mantine/core";
import { IconCalendar, IconMapPin, IconLink, IconBrandLinkedin, IconBrandGithub, IconCertificate, IconDeviceLaptop, IconClock, IconBuildingChurch, IconUser } from "@tabler/icons-react";
export default function About() {
    return (
        <BackgroundImage src="/img/server.jpg">
            <Center w={"100%"}>
                <Paper mt={80} mb={100} p={20} radius={30} bg={"rgb(16,16,16, 0.9)"} style={{ backdropFilter: "blur(5px)" }}>
                    <Stack display={"flex"} gap={0} >
                        <Avatar size={200} mx={"auto"} src={"/img/avatar.jpg"} />
                        <Text mx={"auto"} fw={600} fz={"3rem"}>
                            Robert de Leeuw
                        </Text>
                        <Grid columns={2} mx={50} my={20}>
                            <GridCol span={"content"} miw={0}>
                                <div style={{ marginTop: 10, display: "flex" }}>
                                    <IconCalendar style={{ marginTop: "auto", marginBottom: "auto", marginRight: "10px" }} />

                                    <Text my={"auto"}>
                                        17 jaar
                                    </Text>
                                </div>
                            </GridCol>
                            <GridCol span={"content"} miw={0}>
                                <div style={{ marginTop: 10, display: "flex" }} >
                                    <IconMapPin style={{ marginTop: "auto", marginBottom: "auto", marginRight: "10px" }} />
                                    <Text my={"auto"}>
                                        Nederland
                                    </Text>

                                </div>
                            </GridCol>
                            <GridCol span={"content"}>
                                <Anchor display={"flex"} mt={10} >
                                    <IconLink style={{ marginTop: "auto", marginBottom: "auto", marginRight: "10px" }} />
                                    <Text my={"auto"}>
                                        Mijn CV
                                    </Text>
                                </Anchor>
                            </GridCol>
                            <GridCol span={"content"}>
                                <Anchor display={"flex"} mt={10} >
                                    <IconBrandLinkedin style={{ marginTop: "auto", marginBottom: "auto", marginRight: "10px" }} />
                                    <Text my={"auto"}>
                                        LinkedIn
                                    </Text>
                                </Anchor>
                            </GridCol>
                            <GridCol span={"content"}>
                                <Anchor display={"flex"} mt={10}>
                                    <IconBrandGithub style={{ marginTop: "auto", marginBottom: "auto", marginRight: "10px" }} />
                                    <Text my={"auto"}>
                                        Github
                                    </Text>
                                </Anchor>
                            </GridCol>
                        </Grid>
                        <Grid columns={2} mt={30} gutter={"xl"}>
                            <GridCol span={1}>
                                <Card radius={"lg"} style={{ backgroundColor: "rgb(21, 21, 21,.9)" }}>
                                    <Text mx={"auto"} fz={"2rem"} fw={600}>Opleidingen</Text>
                                    <Divider my={20} mb={30} />
                                    <Timeline active={1} bulletSize={24} lineWidth={2} mx={"auto"} mb={15}>
                                        <TimelineItem bullet={<IconCertificate size={14} />} title="Michaël College">
                                            <Text c="dimmed" size="sm">MAVO Opleiding Economie</Text>
                                            <Text size="xs" mt={4}>2018 - 2022</Text>
                                        </TimelineItem>

                                        <TimelineItem bullet={<IconDeviceLaptop size={14} />} title="ROC Tilburg" lineVariant="dashed">
                                            <Text c="dimmed" size="sm">ICT Expert System & Devices niv. 4</Text>
                                            <Text size="xs" mt={4}>2022 - heden</Text>
                                        </TimelineItem>

                                        <TimelineItem title="Toekomstige opleidingen" bullet={<IconClock size={12} />}>
                                        </TimelineItem>
                                    </Timeline>
                                </Card>
                            </GridCol>
                            <GridCol span={1}>
                                <Card radius={"lg"} style={{ backgroundColor: "rgb(21, 21, 21,.9)" }}>
                                    <Text mx={"auto"} fz={"2rem"} fw={600}>Ervaring</Text>
                                    <Divider my={20} mb={30} />
                                    <Timeline active={1} bulletSize={24} lineWidth={2} mx={"auto"} mb={15}>
                                        <TimelineItem bullet={<IconBuildingChurch size={14} />} title="Het Klooster">
                                            <Text c="dimmed" size="sm">Maatschappelijke stage</Text>
                                            <Text size="xs" mt={4}>feb. 2022</Text>
                                        </TimelineItem>

                                        <TimelineItem bullet={<IconUser size={14} />} title="Recruit a student" lineVariant="dashed">
                                            <Text c="dimmed" size="sm">Uitzendkracht</Text>
                                            <Text size="xs" mt={4}>2021 - heden</Text>
                                        </TimelineItem>

                                        <TimelineItem title="Toekomstige ervaringen" bullet={<IconClock size={12} />}>
                                        </TimelineItem>
                                    </Timeline>
                                </Card>
                            </GridCol>
                        </Grid>


                    </Stack>
                </Paper>


            </Center>
        </BackgroundImage>
    )
}
