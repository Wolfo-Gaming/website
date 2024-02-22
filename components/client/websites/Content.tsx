"use client";

import { Table } from "@/components/Table";
import { getConfig, putConfig } from "@/lib/caddy";
import { ActionIcon, Button, Flex, Group, Modal, Stack, Switch, TextInput, Textarea, rem, useMantineTheme } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { IconArrowRampLeft, IconDeviceFloppy, IconFileCode, IconPencil, IconQuestionMark, IconTextSize, IconTrash } from "@tabler/icons-react";
import jp from "jsonpath";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import Titlebar from "./Titlebar";
export default function Content() {
    const theme = useMantineTheme();
    const [data, setData] = useState<any>([])
    const [conf, setConfig] = useState<any>()
    const [tempconf, setTempConfig] = useState<any>()
    const [editConfigOpen, setEditConfigOpen] = useState(false)
    const [editConfigIndex, setEditConfigIndex] = useState(0)
    function sync() {
        getConfig().then((config) => {
            setConfig(config)
            if (config.apps.http.servers) {
                const server = config.apps.http.servers["srv0"];
                var res = server.routes.map((route: any) => {
                    console.log(route)
                    var metadata: any;
                    var icon: any;
                    var type: any
                    if (jp.value(route, "$.handle[0].routes[0].handle[0].handler") == "reverse_proxy") {
                        type = "Reverse proxy"
                        icon = <IconArrowRampLeft size={26} color={theme.colors.blue[6]} />
                        metadata = {
                            remote: jp.value(route, "$.handle[0].routes[0].handle[0].upstreams[0].dial") ?? "0.0.0.0"
                        }
                    } else if (jp.value(route, "$.handle[0].routes[0].handle[0].handler") == "static_response") {
                        type = "Static response"
                        icon = <IconTextSize size={26} color={theme.colors.cyan[6]} />
                        metadata = {
                            response: jp.value(route, "$.handle[0].routes[0].handle[0].body") ?? ""
                        }
                    } else if (jp.value(route, "$.handle[0].routes[0].handle[0].handler") == "vars") {
                        type = "Static file"
                        icon = <IconFileCode size={26} color={theme.colors.green[6]} />
                        metadata = {
                            root: jp.value(route, "$.handle[0].routes[0].handle[0].root") ?? ""
                        }
                    } else {
                        type = "Unknown"
                        icon = <IconQuestionMark size={26} />
                        metadata = {}
                    }
                    return {
                        path: jp.value(route, "$.handle[0].routes[0].match[0].path") ?? "/",
                        type,
                        raw_type: jp.value(route, "$.handle[0].routes[0].handle[0].handler"),
                        domain: <Group gap="sm">
                            {icon}
                            <Link href={`https://${jp.value(route, "$.match[0].host[0]") ?? ""}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                                {jp.value(route, "$.match[0].host[0]") ?? ""}
                            </Link>
                        </Group>,
                        id: (jp.value(route, "$.match[0].host[0]") ?? "") + "_" + (jp.value(route, "$.handle[0].routes[0].handle[0].handler") ?? ""),
                        metadata,
                        target: jp.value(route, "$.handle[0].routes[0].handle[0].upstreams[0].dial") ?? "",
                        actions: <Flex>
                            <Group ml={"auto"}>
                                <ActionIcon color="teal" onClick={() => {
                                    const confIndex = server.routes.findIndex((r: any) => { return r.match[0].host[0] == jp.value(route, "$.match[0].host[0]") })
                                    if (confIndex != -1) {

                                        setEditConfigIndex(confIndex)
                                        setEditConfigOpen(true)
                                    }
                                }}>
                                    <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                                <ActionIcon color="red" onClick={() => {
                                    const confIndex = server.routes.findIndex((r: any) => { return r.match[0].host[0] == jp.value(route, "$.match[0].host[0]") })
                                    if (confIndex != -1) {
                                        server.routes.splice(confIndex, 1)
                                        putConfig(config).then(() => {
                                            notifications.show({
                                                title: "Removed site",
                                                message: "Successfully removed site!",
                                                color: "green"
                                            })
                                            sync()
                                        }).catch(() => {
                                            notifications.show({
                                                title: "Error",
                                                message: "Error while saving config"
                                            })
                                        })
                                    }
                                }}>
                                    <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                            </Group>
                        </Flex>
                    }
                })
                console.log(res)
                setData(res)
            }
        })
    }
    useEffect(sync, [])

    return (
        <>
            <Titlebar sync={sync} />
            <Modal opened={editConfigOpen} onClose={() => {
                setTempConfig({})
                setEditConfigOpen(false)
            }} title="Edit config" centered>
                {conf ?
                    <>
                        {jp.value(conf.apps.http.servers["srv0"].routes[editConfigIndex], "$.handle[0].routes[0].handle[0].handler") == "reverse_proxy" ?
                            <Stack gap={10}>
                                <TextInput label={"Domain"} description={"Domain to accept requests from"} withAsterisk defaultValue={jp.value(conf.apps.http.servers["srv0"].routes[editConfigIndex], "$.match[0].host[0]") ?? ""} onChange={(event) => {
                                    var r = {}
                                    jp.value(r, `$.apps.http.servers["srv0"].routes[${editConfigIndex}].match[0].host[0]`, event.currentTarget.value)
                                    console.log(r)
                                    const res = _.merge(conf, r)
                                    setTempConfig(res)
                                }} />
                                <TextInput label="Proxy host" description={"Target to redirect requests to"} withAsterisk defaultValue={jp.value(conf.apps.http.servers["srv0"].routes[editConfigIndex], "$.handle[0].routes[0].handle[0].upstreams[0].dial") ?? ""} onChange={(event) => {
                                    var r = {}
                                    jp.value(r, `$.apps.http.servers["srv0"].routes[${editConfigIndex}].handle[0].routes[0].handle[0].upstreams[0].dial`, event.currentTarget.value)
                                    console.log(r)
                                    const res = _.merge(conf, r)
                                    setTempConfig(res)
                                }} />
                                <Switch label={"Disable automatic HTTPS"} mt={10} disabled />
                                <Button fullWidth leftSection={<IconDeviceFloppy />} mt={10} onClick={() => {
                                    putConfig(tempconf).then(() => {
                                        setEditConfigOpen(false)
                                        notifications.show({
                                            title: "Saved config",
                                            message: "Successfully saved config!",
                                            color: "green"
                                        })
                                        sync()
                                    }).catch(() => {
                                        notifications.show({
                                            title: "Error",
                                            message: "Error while saving config"
                                        })
                                    })
                                }}>Save</Button>
                            </Stack> : ""}
                        {jp.value(conf.apps.http.servers["srv0"].routes[editConfigIndex], "$.handle[0].routes[0].handle[0].handler") == "static_response" ? <Stack gap={10}>
                            <TextInput label={"Domain"} description={"Domain to accept requests from"} withAsterisk defaultValue={jp.value(conf.apps.http.servers["srv0"].routes[editConfigIndex], "$.match[0].host[0]") ?? ""} onChange={(event) => {
                                var r = {}
                                jp.value(r, `$.apps.http.servers["srv0"].routes[${editConfigIndex}].match[0].host[0]`, event.currentTarget.value)
                                console.log(r)
                                const res = _.merge(conf, r)
                                setTempConfig(res)
                            }} />
                            <Textarea label="Content" description={"Content to serve"} withAsterisk defaultValue={jp.value(conf.apps.http.servers["srv0"].routes[editConfigIndex], "$.handle[0].routes[0].handle[0].body") ?? ""} onChange={(event) => {
                                var r = {}
                                jp.value(r, `$.apps.http.servers["srv0"].routes[${editConfigIndex}].handle[0].routes[0].handle[0].body`, event.currentTarget.value)
                                console.log(r)
                                const res = _.merge(conf, r)
                                setTempConfig(res)
                            }} />
                            <Button fullWidth leftSection={<IconDeviceFloppy />} mt={10} onClick={() => {
                                putConfig(tempconf).then(() => {
                                    setEditConfigOpen(false)
                                    notifications.show({
                                        title: "Saved config",
                                        message: "Successfully saved config!",
                                        color: "green"
                                    })
                                    sync()
                                }).catch(() => {
                                    notifications.show({
                                        title: "Error",
                                        message: "Error while saving config"
                                    })
                                })
                            }}>Save</Button>
                        </Stack> : ""}
                    </>
                    : ""}
            </Modal>
            <Table data={data.sort((a: any, b: any) => a.type.localeCompare(b.type))} headers={[{ name: "domain", width: rem(270) }, { name: "type" }, { name: "target" }, { name: "actions", width: rem(100), textAlign: "center" }]} onSelectionChange={console.log} />

        </>
    )
}