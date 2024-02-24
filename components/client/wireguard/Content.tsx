"use client";

import { Table } from "@/components/Table";
import { deletePeer, getInterface, getPeers } from "@/lib/wireguard";
import { ActionIcon, Button, Flex, Group, Modal, rem, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import moment from "moment"
import QRCode from "react-qr-code";
import prettyBytes from "pretty-bytes"
import { IconDeviceDesktop, IconDownload, IconPencil, IconQrcode, IconTrash } from "@tabler/icons-react";
import Titlebar from "./Titlebar";
import redirect from "@/lib/redirect";
import { notifications } from "@mantine/notifications";
export default function Content() {
    const theme = useMantineTheme()
    const [peers, setPeers] = useState<any[]>([])
    const [actionPeer, setActionPeer] = useState<any>()
    const [interf, setInterf] = useState<any>()
    const [qrModalOpen, setQrModalOpen] = useState(false)
    function sync() {
        getPeers().then((data) => {
            if (data == undefined) return;
            setPeers(data.content.map(p => {
               
                var lastseenago = Date.now() - (p.latestHandshake * 1000)
                return {
                    pubkey: <Group>
                        <IconDeviceDesktop size={26} color={lastseenago > 300000 ? theme.colors.red[6] : theme.colors.teal[6]} />
                        {p.publicKey}
                    </Group>,
                    lastseen: p.latestHandshake == 0 ? "Never" : moment(new Date(p.latestHandshake * 1000)).fromNow(),
                    allowedIps: p.allowedIps,
                    ip: p.allowedSubnets.join(','),
                    receive: prettyBytes(p.transferRx),
                    transmit: prettyBytes(p.transferTx),
                    actions: <Flex>
                        <Group ml={"auto"}>
                            <ActionIcon color="red" onClick={() => {
                                deletePeer(p.publicKey).then(() => {

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
                            }}>
                                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon color="blue" onClick={() => {
                                redirect("/api/client/wireguard/download?publicKey=" + encodeURIComponent(p.publicKey))
                            }}>
                                <IconDownload style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon color="grape" onClick={() => {
                                setActionPeer(p)
                              
                                getInterface().then((inr) => {
                                    setInterf(inr)
                                    setQrModalOpen(true)
                                }).catch(() => setQrModalOpen(false))
                            }}>
                                <IconQrcode style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Flex>
                }
            }))
        })
    }
    useEffect(() => {
        const int = setInterval(sync, 10000);
        sync()
        return () => clearInterval(int);
    }, [])
    return (
        <>
            <Modal opened={qrModalOpen} onClose={() => setQrModalOpen(false)} title="Config QR Code" >
                <div style={{ display: "flex", width: "100%" }}>
                    {actionPeer && interf ? <QRCode style={{ marginLeft: "auto", marginRight: "auto" }} value={`[Interface]
PrivateKey = ${actionPeer.privateKey}
Address = ${actionPeer.allowedSubnets.join(',')}
    
[Peer]
PublicKey = ${interf.publicKey}
Endpoint = ${interf.endpoint}
AllowedIPs = ${actionPeer.allowedIps}
PersistentKeepalive = ${actionPeer.persistentKeepalive}`} /> : ""}
                </div>

            </Modal>
            <Titlebar sync={sync} />
            <Table data={peers} headers={[{ name: "pubkey", overrideName: "Public Key" }, { name: "ip", overrideName: "IP" }, { name: "allowedIps", overrideName: "Allowed IPs" }, { name: "lastseen", overrideName: "Last Seen" }, { name: "receive" }, { name: "transmit" }, { name: "actions", width: rem(180), textAlign: "center" }]} />
        </>

    )
}