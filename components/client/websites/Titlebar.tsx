"use client";

import { getConfig, putConfig } from "@/lib/caddy";
import { Button, Flex, Menu, MenuDropdown, MenuItem, MenuTarget, Modal, Stack, Switch, Text, TextInput, Textarea, rem, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowRampLeft, IconFileCode, IconPencil, IconPlus, IconTextSize } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function Titlebar({ sync }: { sync: () => void }) {
    const theme = useMantineTheme();
    const [createType, setCreateType] = useState("proxy")
    const [open, setOpen] = useState(false)
    return (
        <Flex>
            <Text my={"auto"} fz={35} fw={600}>
                Websites
            </Text>
            <Modal opened={open} onClose={() => setOpen(false)} centered title={<Text fw={600}>Create {(createType == "static" || createType == "static_files") ? "static site" : createType}</Text>}>
                {createType == "proxy" ? <CreateProxy sync={sync} close={() => setOpen(false)} /> : ""}
                {createType == "static" ? <CreateStatic sync={sync} close={() => setOpen(false)} /> : ""}
            </Modal>
            <Button my={"auto"} ml={"auto"} mr={20} leftSection={<IconPencil />} component={Link} href={"/client/websites/config"}>
                Edit config
            </Button>
            <Menu
                transitionProps={{ transition: 'pop-top-right' }}
                position="top-end"
                width={160}
                withinPortal
            >
                <MenuTarget>

                    <Button
                        leftSection={<IconPlus />} my={"auto"} color="green"
                    >
                        Create new
                    </Button>

                </MenuTarget>
                <MenuDropdown>
                    <MenuItem
                        leftSection={
                            <IconArrowRampLeft
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                            />
                        }
                        onClick={() => {
                            setCreateType("proxy")
                            setOpen(true)
                        }}
                    >
                        Proxy
                    </MenuItem>
                    <MenuItem
                        leftSection={
                            <IconFileCode
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.green[6]}
                                stroke={1.5}
                            />
                        }
                        onClick={() => {
                            setCreateType("static_files")
                            setOpen(true)
                        }}
                    >
                        Static files
                    </MenuItem>
                    <MenuItem
                        leftSection={
                            <IconTextSize
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.cyan[6]}
                                stroke={1.5}
                            />
                        }
                        onClick={() => {
                            setCreateType("static")
                            setOpen(true)
                        }}
                    >
                        Static
                    </MenuItem>
                </MenuDropdown>
            </Menu>
        </Flex>
    )
}
function CreateProxy({ sync, close }: { sync: () => void, close: any }) {

    const [domain, setDomain] = useState("")
    const [host, setHost] = useState("")
    return (
        <Stack gap={10}>
            <TextInput label={"Domain"} description={"Domain to accept requests from"} value={domain} withAsterisk onChange={(ev) => {
                setDomain(ev.currentTarget.value)
            }} />
            <TextInput label="Proxy host" description={"Target to redirect requests to"} value={host} withAsterisk onChange={(ev) => {
                setHost(ev.currentTarget.value)
            }} />
            <Switch label={"Disable automatic HTTPS"} mt={10} disabled />
            <Button fullWidth leftSection={<IconPlus />} color="green" mt={10} onClick={() => {
                getConfig().then(config => {
                    const s = config
                    s.apps.http.servers["srv0"].routes.push({
                        "handle": [
                            {
                                "handler": "subroute",
                                "routes": [
                                    {
                                        "handle": [
                                            {
                                                "handler": "reverse_proxy",
                                                "upstreams": [
                                                    {
                                                        "dial": host
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "match": [
                            {
                                "host": [
                                    domain
                                ]
                            }
                        ],
                        "terminal": true
                    })
                    putConfig(s).then(() => {
                        close()
                        notifications.show({
                            title: "Saved config",
                            message: "Successfully saved config!",
                            color: "green"
                        })
                        sync()
                    }).catch(() => {
                        notifications.show({
                            title: "Error",
                            message: "Error while saving config",
                            color: "red"
                        })
                    })
                })

            }}>Create</Button>
        </Stack>
    )
}

function CreateStatic({ sync, close }: { sync: () => void, close: any }) {
    const [domain, setDomain] = useState("")
    const [content, setContent] = useState("")
    return (
        <Stack gap={10}>
            <TextInput label={"Domain"} description={"Domain to accept requests from"} withAsterisk value={domain} onChange={(ev) => {
                setDomain(ev.currentTarget.value)
            }} />
            <Textarea label="Content" description={"Content to serve"} withAsterisk value={content} onChange={(ev) => {
                setContent(ev.currentTarget.value)
            }} />
            <Button fullWidth leftSection={<IconPlus />} color="green" mt={10} onClick={() => {
                getConfig().then(config => {
                    const s = config
                    s.apps.http.servers["srv0"].routes.push({
                        "handle": [
                            {
                                "handler": "subroute",
                                "routes": [
                                    {
                                        "handle": [
                                            {
                                                "body": content,
                                                "handler": "static_response"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "match": [
                            {
                                "host": [
                                    domain
                                ]
                            }
                        ],
                        "terminal": true
                    })
                    console.log(s)
                    putConfig(s).then(() => {
                        close()
                        notifications.show({
                            title: "Saved config",
                            message: "Successfully saved config!",
                            color: "green"
                        })
                        sync()
                    }).catch(() => {
                        notifications.show({
                            title: "Error",
                            message: "Error while saving config",
                            color: "red"
                        })
                    })
                })

            }}>Create</Button>
        </Stack>
    )
}