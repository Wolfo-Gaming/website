import { BackgroundImage, Button, Center, Flex, Grid, GridCol, Paper, SimpleGrid, Text, Image, Container, Title, Card, Overlay, CardSection, Badge, Group, Divider } from '@mantine/core';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { IconBoxSeam, IconCpu2, IconFileCode } from '@tabler/icons-react';
import Link from 'next/link';
import { GithubIcon } from '@mantinex/dev-icons';
import FeaturePaper from '@/components/FeaturePaper';
import { Dots } from '@/components/Dots';
import classes from "./page.module.css"
import { ContentCard } from '@/components/card';
export default function HomePage() {
    return (
        <>
            <Container className={classes.wrapper} size={"80%"} my={100}>
                <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
                <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
                <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
                <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

                <div className={classes.inner}>
                    <Title className={classes.title}>
                        Mijn{' '}
                        <Text component="span" className={classes.highlight} inherit>
                            portfolio
                        </Text>{' '}
                        website
                    </Title>

                    <Container p={0} size={600}>

                        <Text size="lg" c="dimmed" className={classes.description}>
                            Op deze website kun je lezen over waar ik ervaring mee heb en waar in geintresseerd in ben
                        </Text>
                    </Container>

                    <div className={classes.controls}>
                        <Button className={classes.control} size="lg" variant="default" color="gray" leftSection={<GithubIcon size={20} />} mr={20} component={Link} href={"https://github.com/wolfo-gaming"}>
                            Github
                        </Button>
                        <Button className={classes.control} size="lg" color='#2525c2' component={Link} href={"/about"}>
                            Over mij
                        </Button>
                    </div>
                </div>
            </Container>
            <Text style={{ textAlign: "center" }} fw={600} fz={50}>Ervaring Software</Text>
            <div style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: '#2525c2', height: 5, width: 90, borderRadius: 10, marginBottom: 40 }} />
            <Paper mx={40} p={5} my={20} bg={"#111114"}>
                <Center my={15}>
                    <Text fz={40}>Cloud</Text>
                </Center>
                <Center>
                    <div style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: '#2525c2', height: 5, width: 90, borderRadius: 10, marginBottom: 20 }} />
                </Center>
                <Grid columns={4} m={"lg"}>
                    <ContentCard img="/img/software/azure.jpg" color="blue" title="Azure" items={[
                        "Opzetten van cloud-omgevingen",
                        "Aanmaken en onderhouden van VM's",
                        "Remote access met VPN opzetten"
                    ]} href="https://azure.microsoft.com/en-us/" />
                    <ContentCard img="/img/software/hetzner.jpg" color="rgb(213, 12, 45)" title="Hetzner" items={[
                        "Aanmaken van ARM en x86 VM's",
                        "Hosten van applicaties op VPS",
                        "Aanmaken van lokale netwerken"
                    ]} href="https://www.hetzner.com/" />

                </Grid>
            </Paper>
            <Paper mx={40} p={5} my={20} bg={"#111114"}>
                <Center my={15}>
                    <Text fz={40}>Virtualizatie</Text>
                </Center>
                <Center>
                    <div style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: '#2525c2', height: 5, width: 90, borderRadius: 10, marginBottom: 20 }} />
                </Center>
                <Grid columns={4} m={"lg"}>
                    <ContentCard img="/img/software/hyperv.jpg" color="rgb(0, 32, 79)" title="Hyper-V" items={[
                        "Opzetten van virtuele omgevingen",
                        "Aanmaken en onderhouden van VM's",
                        "Verbinden van VM's dmv. Virtual Switch"
                    ]} href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/about/" />
                    <ContentCard img="/img/software/proxmox.jpeg" color="rgb(232, 110, 0)" title="Proxmox" items={[
                        "Aanmaken en onderhouden van LXC containers en VM's",
                        "Verbinden van Containers en VM's dmv. Bridges",
                        "GPU's verbinden aan VM's dmv. passthrough",
                    ]} href="https://www.proxmox.com/en/" />
                    <ContentCard img="/img/software/esxi.jpg" color="rgb(32, 88, 147)" title="VMware ESXI" items={[
                        "Opzetten van omgevingen",
                        "Aanmaken en onderhouden van VM's",
                        "GPU's verbinden aan VM's dmv. passthrough",
                    ]} href="https://www.vmware.com/products/esxi-and-esx.html" />
                    <ContentCard img="/img/software/lxd.png" color="rgb(219, 71, 18)" title="LXD" items={[
                        "Beheer van LXD containers dmv. REST API en lxc client",
                        "Verbinden van VM's dmv bridges",
                        "Verschillende opslag mogelijkheden gebruiken zoals ZFS",
                    ]} href="https://linuxcontainers.org/incus/" />
                    <ContentCard img="/img/software/docker.png" color="rgb(25, 132, 168)" title="Docker" items={[
                        "Aanmaken van containers",
                        "Onderhouden van containers met Portainer",
                        "Basis kennis van docker CLI",
                    ]} href="https://www.docker.com/" />
                    <ContentCard img="/img/software/kvm.jpg" color="rgb(83, 86, 94)" title="KVM" items={[
                        "Aanmaken en onderhouden VM's",
                        "Verbinden van VM's dmv. Bridges",
                        "GPU's verbinden aan VM's dmv. passthrough",
                    ]} href="https://libvirt.org/" />
                </Grid>
            </Paper>

            <Paper mx={40} p={5} my={20} bg={"#111114"}>
                <Center my={15}>
                    <Text fz={40}>Monitoring</Text>
                </Center>
                <Center>
                    <div style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: '#2525c2', height: 5, width: 90, borderRadius: 10, marginBottom: 20 }} />
                </Center>
                <Grid columns={4} m={"lg"}>
                    <ContentCard img="/img/software/zabbix.png" color="rgb(212, 0, 0)" title="Zabbix" items={[
                        "Monitoren van Linux en Windows servers",
                        "Alerts via mail instellen",
                    ]} href="https://www.zabbix.com/" />
                    <ContentCard img="/img/software/grafana.jpg" color="rgb(240, 95, 47)" title="Grafana" items={[
                        "Monitoren van Linux en Windows systemen",
                        "Monitoren van switches en routers dmv SNMP",
                        "Dashboard aanmaken met PromQL",
                    ]} href="https://grafana.com/" />
                    <ContentCard img="/img/software/prometheus.png" color="rgb(218, 78, 49)" title="Prometheus" items={[
                        "Monitoren van Linux en Windows systemen",
                        "Monitoren van switches en routers dmv SNMP",
                        "Basis kennis PromQL",
                    ]} href="https://prometheus.io/" />
                </Grid>
            </Paper>
            <Paper mx={40} p={5} my={20} bg={"#111114"}>
                <Center my={15}>
                    <Text fz={40}>Security</Text>
                </Center>
                <Center>
                    <div style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: '#2525c2', height: 5, width: 90, borderRadius: 10, marginBottom: 20 }} />
                </Center>
                <Grid columns={4} m={"lg"}>
                    <ContentCard img="/img/software/sophos.png" color="rgb(2, 83, 142)" title="Sophos XG Firewall" items={[
                        "Beveiligen van systemen in een virtuele omgeving",
                        "IDS & IPS toepassen",
                        "VPN verbindingen opzetten met IPsec",
                    ]} href="https://www.sophos.com/en-us" />
                    <ContentCard img="/img/software/pfsense.png" color="rgb(50, 65, 184)" title="PFsense" items={[
                        "Beveiligen van systemen in een virtuele & fysieke omgeving",
                        "Rules & port forwards aanmaken",
                        "VPN verbindingen opzetten met Wireguard en OpenVPN",
                    ]} href="https://www.pfsense.org/" />
                    <ContentCard img="/img/software/openvpn.jpg" color="rgb(233, 124, 31)" title="OpenVPN" items={[
                        "Opzetten en configureren van OpenVPN Access Server",
                        "Opzetten van Point-to-Site verbindingen",
                    ]} href="https://openvpn.net/" />
                    <ContentCard img="/img/software/wireguard.png" color="rgb(135, 23, 25)" title="Wireguard" items={[
                        "Opzetten van Point-to-Site verbindingen",
                        "Opzetten van Site-to-Site verbindingen",
                    ]} href="https://www.wireguard.com/" />
                </Grid>
            </Paper>
            <Paper mx={40} p={5} my={20} bg={"#111114"}>
                <Center my={15}>
                    <Text fz={40}>Overige Software</Text>
                </Center>
                <Center>
                    <div style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: '#2525c2', height: 5, width: 90, borderRadius: 10, marginBottom: 20 }} />
                </Center>
                <Grid columns={4} m={"lg"}>
                    <ContentCard img="/img/software/mariadb.jpg" color="rgb(28, 65, 84)" title="MariaDB" items={[
                        "Basis kennis SQL",
                        "Opzetten van MariaDB servers",
                    ]} href="https://mariadb.org/" />
                    <ContentCard img="/img/software/postgres.jpg" color="rgb(51, 103, 145)" title="PostgreSQL" items={[
                        "Basis kennis SQL",
                        "Opzetten van PostgreSQL servers",
                    ]} href="https://www.postgresql.org/" />
                    <ContentCard img="/img/software/mongodb.png" color="rgb(0, 104, 74)" title="MongoDB" items={[
                        "Opzetten van beveiligde MongoDB servers",
                        "Gebruik maken van MongoDB Atlas",
                        "Gebruik maken van MongoDB in javascript",
                    ]} href="https://www.mongodb.com/" />
                    <ContentCard img="/img/software/pterodactyl.jpg" color="rgb(190, 109, 52)" title="Pterodactyl" items={[
                        "Opzetten van Game servers",
                        "Beheer van meerdere nodes",
                    ]} href="https://pterodactyl.io/" />
                    <ContentCard img="/img/software/nginx.png" color="rgb(0, 150, 57)" title="NGINX" items={[
                        "Opzetten van reverse proxies",
                        "Opzetten van HTML & PHP gebaseerde websites",
                        "SSL dmv. letsencrypt aanzetten",
                    ]} href="https://www.nginx.com/" />
                    <ContentCard img="/img/software/apache.png" color="rgb(208, 34, 46)" title="Apache2" items={[
                        "Opzetten van HTML & PHP gebaseerde websites",
                        "SSL dmv. letsencrypt aanzetten",
                    ]} href="https://httpd.apache.org/" />
                    <ContentCard img="/img/software/iredmail.png" color="rgb(255, 0, 0)" title="iRedMail" items={[
                        "Opzetten van mail servers",
                        "Beheren van gebruikers",
                        "DNS domein aanpassen (SPF, DMARC, DKIM)",
                    ]} href="https://www.iredmail.org/" />
                    <ContentCard img="/img/software/nextcloud.jpg" color="rgb(0, 122, 189)" title="Nextcloud" items={[
                        "Opzetten van samenwerkings-omgevingen",
                        "Koppelen aan AD dmv. LDAP",
                        "Koppelen aan mail servers dmv. IMAP en SMTP",
                    ]} href="https://nextcloud.com/" />
                </Grid>

            </Paper>
            <Text style={{ textAlign: "center" }} fw={600} fz={50} mt={40}>Hardware</Text>
            <div style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: '#2525c2', height: 5, width: 90, borderRadius: 10, marginBottom: 40 }} />
            <Paper mx={40} p={5} my={20} bg={"#111114"}>
                <Grid columns={4} m={"lg"}>
                    <ContentCard img="/img/hardware/R610_Front.png" imgprops={{ fit: "contain" }} color="rgb(28, 65, 84)" title="Poweredge R610" items={[]} href="https://mariadb.org/" showButton={false} />
                    <ContentCard img="/img/hardware/R710_Front.png" imgprops={{ fit: "contain" }} color="rgb(51, 103, 145)" title="Poweredge R710" items={[]} href="https://www.postgresql.org/" showButton={false} />
                    <ContentCard img="/img/hardware/DL360_Gen9_LFF_front.png" imgprops={{ fit: "contain" }} color="rgb(0, 104, 74)" title="Proliant DL360g9" items={[]} href="https://www.mongodb.com/" showButton={false} />
                    <ContentCard img="/img/hardware/1921_K9_Front.jpg" imgprops={{ fit: "contain" }} color="rgb(190, 109, 52)" title="Cisco 1921" items={[]} href="https://pterodactyl.io/" showButton={false} />
                    <ContentCard img="/img/hardware/WS-C3560CG-8PC-S_Front.jpg" imgprops={{ fit: "contain" }} color="rgb(0, 150, 57)" title="Catalyst C3560" items={[]} href="https://www.nginx.com/" showButton={false} />
                    <ContentCard img="/img/hardware/5524_Front_View.jpg" imgprops={{ fit: "contain" }} color="rgb(208, 34, 46)" title="Powerconnect 5524" items={[]} href="https://httpd.apache.org/" showButton={false} />
                </Grid>
            </Paper>

        </>

    );
}
