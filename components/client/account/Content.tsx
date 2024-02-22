"use client";
import { getToken, updateUser } from "@/lib/session";
import { User } from "@/types/User";
import { Button, Flex, Grid, GridCol, Paper, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";

export default function Content({ user }: { user: User }) {
    const [tempUser, setTempUser] = useState(user)
    return (
        <Paper bg={"var(--mantine-color-dark-6)"} p={10} radius={"md"} mt={10}>
            <Grid>
                <GridCol span={6}>
                    <TextInput label="Email" w={"50%"} required defaultValue={user.email} onChange={(event) => {
                        const newUser = { ...tempUser }
                        newUser.email = event.currentTarget.value;
                        setTempUser(newUser);
                    }} />
                </GridCol>
                <GridCol span={6}>

                </GridCol>
            </Grid>
            <Button leftSection={<IconDeviceFloppy />} mt={20} onClick={() => {
                updateUser(user.email, tempUser).then(() => {
                    getToken(tempUser).then((token) => {
                        document.cookie = `auth_token=${token};path=/`;
                        notifications.show({
                            title: "Saved user",
                            message: "Successfully saved user!",
                            color: "green"
                        })
                    }).catch(() => {
                        notifications.show({
                            title: "Error",
                            message: "Error while saving user"
                        })
                    })
                }).catch(() => {
                    notifications.show({
                        title: "Error",
                        message: "Error while saving user"
                    })
                })
            }}>Save</Button>
        </Paper>
    )
}