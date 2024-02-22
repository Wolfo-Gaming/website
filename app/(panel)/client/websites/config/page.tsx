import Content from "@/components/client/websites/config/Content";
import { getConfig } from "@/lib/caddy";
import getUser from "@/lib/session";
import { Stack } from "@mantine/core";
export const metadata = {
    title: "Websites"
}
export default async function Config() {
    const user = await getUser();
    const config = await getConfig()
    return (
        <Stack h={"100%"}>
            <Content config={config} />
        </Stack>
    )
}