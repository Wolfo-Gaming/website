import Content from "@/components/client/account/Content";
import getUser from "@/lib/session";
import { Flex, Text } from "@mantine/core";

export default async function Account() {
    const user = await getUser()
    return (
        <>
            <Flex>
                <Text my={"auto"} fz={35} fw={600}>
                    Account Settings
                </Text>
            </Flex>
            <Content user={user} />
        </>

    )
}