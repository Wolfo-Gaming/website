"use client";
import { AppShellNavbar, Box, Group, ScrollArea, ThemeIcon, UnstyledButton, rem } from "@mantine/core";
import { IconDashboard, IconGlobe, IconNetwork } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from './Navbar.module.css';

export default function Navbar() {
    const path = usePathname();
    console.log(path)
    const items = [
        {
            icon: IconDashboard,
            name: "Dashboard",
            href: "/client"
        },
        {
            icon: IconGlobe,
            name: "Websites",
            href: "/client/websites",
            color: "green"
        },
        {
            icon: IconNetwork,
            name: "Wireguard",
            href: "/client/wireguard",
            color: "orange"
        }
    ]
    return (
        <AppShellNavbar display={"flex"} style={{borderColor: "#18181d"}}>
            <nav className={classes.navbar}>

                <ScrollArea className={classes.links}>
                    <div className={classes.linksInner}>
                        {items.map(item => {
                            return (
                                <>
                                    <UnstyledButton className={classes.control} component={Link} href={item.href} prefetch={false}>
                                        <Group justify="space-between" gap={0}>
                                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                                <ThemeIcon variant="light" color={item.color} size={30}>
                                                    <item.icon style={{ width: rem(18), height: rem(18) }} />
                                                </ThemeIcon>
                                                <Box ml="md">{item.name}</Box>
                                            </Box>
                                        </Group>
                                    </UnstyledButton>
                                </>
                            )
                        })}
                    </div>
                </ScrollArea>

            </nav>
        </AppShellNavbar>
    )
}