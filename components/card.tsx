import { Grid, Card, Image, Text, Group, List, Button, GridCol, CardSection, ListItem } from "@mantine/core"
import Link from "next/link"
export function ContentCard({
    img,
    title,
    items,
    href,
    buttonContent,
    color,
    imgprops,
    showButton = true
}: {
    img: string,
    title: string,
    items: string[],
    href: string,
    buttonContent?: string,
    color: string,
    imgprops?: any,
    showButton?: boolean
}) {
    return (
        <GridCol span={1}>
            <Card shadow="sm" padding="lg" pt={0} radius="md" bg={"#18181d"} h={"100%"}>
                <CardSection>
                    <Image
                        src={img}
                        height={160}
                        alt={title}
                        {...imgprops}
                    />
                </CardSection>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} fz={20}>{title}</Text>
                </Group>

                
                    <List spacing={0} mb={20}>
                        {items.map(item => {
                            return (
                                <ListItem><Text size="sm" c="dimmed" mb="xs">{item}</Text></ListItem>
                            )
                        })}
                    </List>
                

               {showButton? <Button component={Link} href={href} color={color} fullWidth mt="auto" radius="md" >
                    {buttonContent ? buttonContent : "Website"}
                </Button>:""}
            </Card>
        </GridCol>
    )
}