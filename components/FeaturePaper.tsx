import { Paper, Center, Flex, Title, Text, Stack } from "@mantine/core";
import { ElementType, ReactNode } from "react";
import classes from "./FeaturePaper.module.css"
export default function FeaturePaper({ icon, title, children, mb, component, href }: React.PropsWithChildren<{ icon: ReactNode, title: string, mb?: string | number, component?: any, href?: any }>) {
    return (
        <Paper
            mb={mb}
            shadow="sm"
            radius="md"
            style={{
                backgroundColor: "#18181d",
                padding: 25,
                paddingTop: 0,
                marginTop: 60,
                textDecoration: "none",
                color: "inherit"
            }}
            className={classes.paper} component={component} href={href}>
            <Center style={{ height: 0, marginBottom: 50 }}>
                {icon}
            </Center>

            <Flex direction="row" style={{ marginBottom: 10 }}>
                <Title
                    style={{ cursor: title.includes("¹") ? "pointer" : "auto", textAlign: "center", color: "inherit" }}
                    order={3}
                    size="h2"
                    mx="auto"
                >
                    {title}
                </Title>
            </Flex>

            <Stack>
                <Center style={{color: "inherit"}}>
                    {children}
                </Center>
            </Stack>


        </Paper>
    );
}