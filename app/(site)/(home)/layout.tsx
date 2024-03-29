import Footer from "@/components/layout/site/Footer";
import Header from "@/components/layout/site/Header";
import { AppShell, AppShellFooter, AppShellHeader, AppShellMain } from "@mantine/core";

export default async function MainLayout({ children }: React.PropsWithChildren) {
    return (
        <AppShell header={{ height: 60 }}>
            <AppShellHeader p={10} style={{ marginTop: "auto", marginBottom: "auto", display: "flex", borderColor: "#18181d" }} bg={"#0b0b0d"}>

                <Header/>

            </AppShellHeader>
            <AppShellMain bg={"#0b0b0d"}>
                {children}
            </AppShellMain>
            <AppShellFooter p={10} style={{ marginTop: "auto", marginBottom: "auto", display: "flex", borderColor: "#18181d",position:"inherit" }} bg={"#0b0b0d"}>
                <Footer />
            </AppShellFooter>
        </AppShell>
    )
}