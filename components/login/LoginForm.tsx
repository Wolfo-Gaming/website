"use client";

import redirect from "@/lib/redirect";
import { Button, Loader, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import nookies from "nookies";
import { useState } from "react";

export default function LoginForm({ onLogin }: { onLogin: (ctx: { email: string, password: string }) => Promise<string | false>; }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    return (
        <Paper m={"auto"} p={20}>
            <Stack w={"20rem"}>
                <Text fz={30} mx={"auto"}>Login</Text>
                <TextInput
                    label={"Username"}
                    value={email}
                    error={error}
                    onChange={(event) => setEmail(event.currentTarget.value)} />
                <PasswordInput
                    label={"Password"}
                    error={error}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)} />
                <Button rightSection={loading ? <Loader color="white" size={20} /> : <IconChevronRight />} leftSection={<span />} fullWidth justify="space-between" onClick={() => {
                    if (!email || !password) return;
                    setError("")
                    setLoading(true)
                    onLogin({ email, password }).then((jwt) => {
                        setLoading(false)
                        if (!jwt) {
                            setError("Unauthorized")
                        } else {
                            nookies.set(null, "auth_token", jwt, {
                                maxAge: 30 * 24 * 60 * 60,
                                path: '/',
                            })
                            redirect("/client")
                        }
                    }).catch(err => {
                        setError("Internal server error")
                        setLoading(false)
                    })
                }}>Login</Button>
            </Stack>
        </Paper>
    )
}