import { User } from "@/types/User"
import { Button, Text } from "@mantine/core"
import { IconLink } from "@tabler/icons-react"
import Link from "next/link"
export default function Header({ user }: { user: User | null }) {
    return (
        <>
            <Text component={Link} href={"/"} my={"auto"} fw={500} fz={25} ml={20} color="rgb(116, 192, 252)">
                Robert de Leeuw
            </Text>
            <Button ml={"auto"} component={Link} href={"/about"} variant="subtle">
                About
            </Button>
            <Button component={Link} href={"/blog"} variant="subtle" ml={10}>
                Blog
            </Button>
            {user ? <Button leftSection={<IconLink />} component={Link} href={"/client"} ml={10}>
                Client
            </Button> : ""}
        </>
    )
}