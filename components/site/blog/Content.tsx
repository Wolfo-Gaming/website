import { User } from "@/types/User";
import { Stack, Paper, Flex, Text, Image, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Content({ user }: { user: User | null }) {
    return (
        <Stack mx={40} my={40}>
            {user ? <Flex>
                <Button ml={"auto"} leftSection={<IconPlus />} color="green">Create Post</Button>
            </Flex> : ""}
            <Paper radius={10} bg={"#18181d"}>
                <Flex>
                    <Image style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} src={"/img/server.jpg"} h={120} w={240} />
                    <Stack ml={20} mt={10} gap={10}>
                        <Text fw={500} fz={30}>Title</Text>
                        <Text style={{ color: "gray" }}>Description</Text>
                    </Stack>

                </Flex>
            </Paper>
        </Stack>
    )
}