"use client";
import { Checkbox, Table as MantineTable, ScrollArea, rem, useMantineTheme } from '@mantine/core';
import cx from 'clsx';
import { useEffect, useState } from 'react';
import classes from './Table.module.css';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function Table({ data, headers, onSelectionChange }: { data: { id: string, [key: string]: any }[], headers: { name: string, width?: any, textAlign?: any,overrideName?: string }[], onSelectionChange?: (selection: { id: string, [key: string]: any }[]) => void }) {
    const theme = useMantineTheme();

    const [selection, setSelection] = useState<string[]>([]);
    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange(selection.map(sel => {
                return data.find(d => d.id == sel) as { [key: string]: any; id: string; };
            }))
        }
    }, [selection]);
    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
    const toggleAll = () =>
        setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

    const rows = data.map((item, index) => {
        const selected = selection.includes(item.id);
        return (
            <MantineTable.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })} style={{ border: "none" }}>
                <MantineTable.Td>
                    <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />
                </MantineTable.Td>
                {headers.map(head => {
                    return (
                        <MantineTable.Td>
                            {item[head.name]}
                        </MantineTable.Td>
                    )
                })}
            </MantineTable.Tr>
        );
    });

    return (
        <ScrollArea>
            <MantineTable miw={800} verticalSpacing="sm" striped stripedColor='#16161a'>
                <MantineTable.Thead>
                    <MantineTable.Tr bg={"#16161a"} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, border: "none" }}>

                        <MantineTable.Th style={{ width: rem(40) }}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={selection.length === data.length}
                                indeterminate={selection.length > 0 && selection.length !== data.length}
                            />
                        </MantineTable.Th>
                        {headers.map(head => {
                            return <MantineTable.Th style={{ width: head.width, textAlign: head.textAlign }}>{capitalizeFirstLetter(head.overrideName ?? head.name)}</MantineTable.Th>
                        })}
                    </MantineTable.Tr>
                </MantineTable.Thead>
                <MantineTable.Tbody>{rows}</MantineTable.Tbody>
            </MantineTable>
        </ScrollArea>
    );
}