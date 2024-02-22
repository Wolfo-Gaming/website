"use client";
import { logout } from "@/lib/session";
import { User } from "@/types/User";
import { AppShellHeader, Avatar, Flex, Group, Loader, Menu, Text, UnstyledButton, rem, useMantineTheme } from "@mantine/core";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import cx from 'clsx';
import gravatar from "gravatar";
import { useState } from "react";
import classes from "./Header.module.css";
import Link from "next/link";
export default function Header({ user }: { user: User }) {
    const [userMenuOpened, setUserMenuOpened] = useState(false)
    const [logoutLoading,setLogoutLoading] = useState(false)

    const theme = useMantineTheme();
    return (
        <AppShellHeader bg={"#0b0b0d"} style={{borderColor: "#18181d"}}>
            <Flex h={"100%"}>
                <Menu
                    width={200}
                    position="bottom-end"
                    transitionProps={{ transition: 'pop-top-right' }}
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                    withinPortal
                >
                    <Menu.Target>
                        <UnstyledButton
                            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                        >
                            <Group gap={7}>
                                <Avatar src={gravatar.url(user.email)} alt={user.email} radius="xl" size={20} />
                                <Text fw={500} size="sm" lh={1} mr={3}>
                                    {user.email}
                                </Text>
                                <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                            </Group>
                        </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={
                                <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} color={theme.colors.blue[6]} />
                            }
                            component={Link}
                            href={"/client/account"}
                        >
                            Account settings
                        </Menu.Item>
                        <Menu.Item
                            leftSection={logoutLoading ? <Loader style={{ width: rem(16), height: rem(16) }} size={18} color={theme.colors.red[6]}/> :
                                <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} color={theme.colors.red[6]} />
                            }
                            onClick={() => {
                                setLogoutLoading(true)
                                logout().then(() => {
                                    setLogoutLoading(false)
                                }).catch(() => {
                                    setLogoutLoading(false)
                                })
                            }}
                        >
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Flex>
        </AppShellHeader>
    )
}