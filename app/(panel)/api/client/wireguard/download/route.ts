import { isAuthorized } from "@/lib/session"
import { getInterface, getPeer } from "@/lib/wireguard"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const authorized = await isAuthorized(request)
    if (!authorized || !request.nextUrl.searchParams.get("publicKey")) return new Response("Unauthorized", {
        "status": 403
    })
    const peer = await getPeer(request.nextUrl.searchParams.get("publicKey") as string)
    const interf = await getInterface();
    const config = `[Interface]
PrivateKey = ${peer.privateKey}
Address = ${peer.allowedSubnets.join(',')}
    
[Peer]
PublicKey = ${interf.publicKey}
Endpoint = ${process.env.WG_ENDPOINT}
AllowedIPs = ${peer.allowedIps}
PersistentKeepalive = ${peer.persistentKeepalive}`
    return new Response(config, {
        "headers": {
            'Content-Disposition': `attachment; filename=wireguard.conf`,
            "Content-Type": "text/plain"
        }
    })
}