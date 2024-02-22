import Content from "@/components/client/websites/Content";
import getUser from "@/lib/session";
import { Stack } from "@mantine/core";

export const metadata = {
    title: "Websites"
}
export default async function Websites() {
    const user = await getUser()
    return (
        <Stack>
            <Content />
        </Stack>
    )
}