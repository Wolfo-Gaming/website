import { ActionIcon, Flex } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
    return (
        <Flex w={"100%"}>
         <ActionIcon ml={"auto"} variant="subtle" component={Link} href={"https://github.com/Wolfo-Gaming"}>
            <IconBrandGithub />
         </ActionIcon>
         <ActionIcon ml={10} variant="subtle" component={Link} href={"https://www.linkedin.com/in/robert-de-leeuw-aba39b24b/"}>
            <IconBrandLinkedin />
         </ActionIcon>
        </Flex>
    )
}