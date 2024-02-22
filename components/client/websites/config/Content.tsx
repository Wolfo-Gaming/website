"use client";
import { putConfig } from '@/lib/caddy';
import redirect from '@/lib/redirect';
import { Button, Flex, Group, Modal, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Editor from '@monaco-editor/react';
import { IconChevronLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
export default function Content({ config }: { config: string }) {
    const [conf, setConf] = useState(JSON.stringify(config, null, 2))
    const [discardOpened, setDiscardOpened] = useState(false)
    return (
        <>
            <Flex>
                <Button leftSection={<IconChevronLeft />} variant="subtle" onClick={() => {
                    if (conf != JSON.stringify(config, null, 2)) setDiscardOpened(true);
                    else redirect("/client/websites");
                }}>
                    Back
                </Button>
                <Modal centered opened={discardOpened} onClose={() => setDiscardOpened(false)} title={<Text fw={600}>
                    There are unsaved changes, do you want to continue and discard these?
                </Text>} withCloseButton={false}>

                    <Group>
                        <Button fullWidth onClick={() => setDiscardOpened(false)}>No</Button>
                        <Button variant="subtle" fullWidth onClick={() => {
                           redirect("/client/websites")
                        }}>Yes</Button>
                    </Group>
                </Modal>
                <Button leftSection={<IconDeviceFloppy />} ml={"auto"} disabled={conf == JSON.stringify(config, null, 2)} onClick={() => {

                    putConfig(conf).then(() => {
                        notifications.show({
                            title: "Saved config",
                            message: "Successfully saved config!",
                            color: "green"
                        })
                    }).catch(() => {
                        notifications.show({
                            title: "Error",
                            message: "Error while saving config",
                            color: "red"
                        })
                    })
                }}>
                    Save
                </Button>
            </Flex>
            <Editor value={conf} language='json' theme="vs-dark" height={600} onChange={(value) => {
                if (value) {
                    setConf(value)
                }

            }} />
        </>
    )
}