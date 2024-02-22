import Content from "@/components/client/wireguard/Content"
import getUser from "@/lib/session"
import { generateKeypair } from "@/lib/wireguardkey"
import { Stack } from "@mantine/core"
export const metadata = {
    title: "Wireguard"
}
export default async function Websites() {
    const user = await getUser()
    console.log(generateKeypair())
    return (
        <Stack>
           <Content />
        </Stack>
    )
}