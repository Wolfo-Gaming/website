import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import getUser from "@/lib/session";
import { AppShell, AppShellMain } from "@mantine/core";


export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const user = await getUser();
    return (
        <AppShell header={{ height: 60 }}
            navbar={{
                width: 250,
                breakpoint: 'sm',
            }}
            style={{borderColor: "#18181d"}}
            padding="md">
            <Header user={user} />

            <Navbar />

            <AppShellMain bg={"#0b0b0d"}>
                {children}
            </AppShellMain>
        </AppShell>
    )
}