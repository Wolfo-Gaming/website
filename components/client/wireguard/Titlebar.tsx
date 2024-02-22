"use client";

import { getConfig, putConfig } from "@/lib/caddy";
import { createPeer } from "@/lib/wireguard";
import { generateKeypair } from "@/lib/wireguardkey";
import { Button, Flex, Menu, MenuDropdown, MenuItem, MenuTarget, Modal, NumberInput, Stack, Switch, Text, TextInput, Textarea, rem, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowRampLeft, IconFileCode, IconPencil, IconPlus, IconTextSize } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function Titlebar({ sync }: { sync: () => void }) {
    const theme = useMantineTheme();
    const [keypair, setKeypair] = useState({
        publicKey: "",
        privateKey: ""
    })
    const [persistentKeepalive, setPersistentKeepalive] = useState(15)
    const [allowedIps, setAllowedIps] = useState("0.0.0.0/0")
    const [open, setOpen] = useState(false)
    return (
        <Flex>
            <Text my={"auto"} fz={35} fw={600}>
                Wireguard peers
            </Text>
            <Modal opened={open} onClose={() => setOpen(false)} centered title={<Text fw={600}>Create Peer</Text>}>
                <TextInput label="Private key" defaultValue={keypair.privateKey} />
                <TextInput label="Public key" defaultValue={keypair.publicKey} />
                <TextInput label="Allowed ips" defaultValue={"0.0.0.0/0"} onChange={(event) => setAllowedIps(event.currentTarget.value)}/>
                <NumberInput defaultValue={15} label="Persistent Keepalive" onChange={(value) => setPersistentKeepalive(typeof value == "string" ? parseInt(value) : value)} />
                <Button fullWidth leftSection={<IconPlus />} color="green" mt={10} onClick={() => {
                    createPeer({
                        persistentKeepalive,
                        privateKey: keypair.privateKey,
                        publicKey: keypair.publicKey,
                        allowedIps: allowedIps.split(","),
                        presharedKey: ""
                    }).then(() => {
                        setOpen(false)
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
                }}>Create</Button>
            </Modal>
            <Button
                leftSection={<IconPlus />} my={"auto"} color="green" ml={"auto"} onClick={() => {
                    setKeypair(generateKeypair())
                    setOpen(true)
                }}
            >
                Create new
            </Button>
        </Flex>
    )
}