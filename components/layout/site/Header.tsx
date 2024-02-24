import { User } from "@/types/User"
import { Button, Text } from "@mantine/core"
import { IconLink } from "@tabler/icons-react"
import Link from "next/link"
export default function Header() {
    return (
        <>
            <Text component={Link} href={"/"} my={"auto"} fw={500} fz={25} ml={20} color="white">
                Robert de Leeuw
            </Text>
            <Button ml={"auto"} component={Link} href={"/about"} color="#2525c2">
                Over mij
            </Button>
            {/* <Button component={Link} href={"/blog"} variant="subtle" ml={10} color="#2525c2">
                Blog
            </Button>
            {user ? <Button leftSection={<IconLink />} component={Link} href={"/client"} ml={10} color="#2525c2">
                Client
            </Button> : ""} */}
        </>
    )
}