"use server";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { serializeQuery } from "./request";
import { connectToDatabase } from "./database";
import { stringify } from "querystring";

const client = axios.create({
    baseURL: process.env.WG_HOST,
    headers: {
        Authorization: "Bearer " + process.env.WG_TOKEN
    }
})

type CreatedPeer = {
    "publicKey": string,
    "presharedKey": string,
    "privateKey": string,
    "allowedSubnets": string[],
    "persistentKeepalive": number
}
type PeerCreateRequest = {
    "publicKey"?: string,
    "presharedKey"?: string,
    "privateKey"?: string,
    "allowedIps"?: string[],
    "persistentKeepalive"?: number
}
type Peer = {
    "publicKey": string,
    "presharedKey": string,
    "endpoint": string,
    "allowedSubnets": string[],
    "latestHandshake": number,
    "transferRx": number,
    "transferTx": number,
    "persistentKeepalive": number,
    privateKey: string,
    allowedIps: string[]
}
type PeerList = {
    "totalPages": number,
    "currentPage": number,
    "content": Peer[]
}
type Config = {
    publickey?: string,
    presharedkey?: string,
    endpoint?: string,
    allowedips?: string[],
    persistentkeepalive?: number
}
type Interface = {
    "privateKey": string,
    "publicKey": string,
    "listenPort": number,
    "fwMark": number,
    endpoint: string,
}
export async function getInterface(): Promise<Interface> {
    var data = (await client.get(`/v1/interface`)).data

    return { endpoint: process.env.WG_ENDPOINT, ...data }
}
export async function getPeers(): Promise<PeerList> {
    var data = (await client.get(`/v1/peers`)).data
    const { db } = await connectToDatabase();
    var s = data.content.map(async (p: any) => {
        const res = await db.collection("wireguard").findOne({
            publicKey: p.publicKey
        })
        if (!res) {
            return { privateKey: null, allowedIps: [], ...p }
        } else {
            return { privateKey: res.privateKey, allowedIps: res.allowedIps, ...p };
        }
    })
    return { ...data, content: await Promise.all(s) };
}
//@ts-expect-error
export async function createPeer(peer: PeerCreateRequest): Promise<CreatedPeer> {
    try {
        const s = {...peer};
        delete peer.allowedIps
        var data = (await client.post(`/v1/peers`, peer)).data
        const { db } = await connectToDatabase();
        await db.collection("wireguard").insertOne({ allowedIps: s.allowedIps, ...data })
        return { allowedIps: s.allowedIps, ...data };
    } catch (error) {
        console.error(error)
    }

}
export async function getPeer(pubkey: string): Promise<Peer> {
    var data = (await client.get(`/v1/peers/find?publicKey=${encodeURIComponent(pubkey)}`)).data;
    const { db } = await connectToDatabase();
    const res = await db.collection("wireguard").findOne({
        publicKey: pubkey
    })
    if (!res) {
        return { privateKey: null, allowedIps: "", ...data }
    } else {
        return { privateKey: res.privateKey, allowedIps: res.allowedIps, ...data };
    }
}
export async function deletePeer(pubkey: string): Promise<void> {
    return (await client.delete(`/v1/peers?publicKey=${encodeURIComponent(pubkey)}`)).data
}
export async function updatePeer(pubkey: string, config: Config): Promise<Peer> {
    return (await client.patch(`/v1/peers?publicKey=${encodeURIComponent(pubkey)}&${serializeQuery(config)}`, config)).data
}