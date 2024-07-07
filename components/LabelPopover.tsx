import {
    Button,
    Separator,
    Skeleton,
    Strong,
    TextField,
} from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

import { Label } from '@prisma/client';
import { PrimarySpinner } from '@/components/Spinner';
import axios from 'axios';

interface Props {}

const LabelPopover = (props: Props) => {
    const [labels, setLabels] = useState<Label[]>([]);
    const [labelSelected, setLabelSelected] = useState<boolean[]>([]);

    useEffect(() => {
        axios.get('/api/issues/labels').then((res) => setLabels(res.data));
    }, []);

    const menuItems = labels.map((label, key) => (
        <li key={key}>
            <Separator size='4' />
            <div className='hover:bg-zinc-100 transition-colors'>
                <button className='flex flex-col items-start p-2 ml-2'>
                    <div className='text-primary'>{label.name}</div>
                    <div className='text-secondary'>{label.description}</div>
                </button>
            </div>
        </li>
    ));

    return (
        <div>
            <div id='label-popover-descriptor' className='p-2'>
                <Strong>Apply labels ot this issue</Strong>
            </div>
            <Separator size='4' />
            <div id='label-popover-searchbox' className='p-2'>
                <TextField.Root placeholder='Filter labels'>
                    <TextField.Slot></TextField.Slot>
                </TextField.Root>
            </div>
            {labels ? (
                <ul id='label-popover-labels'>{menuItems}</ul>
            ) : (
                <div className='flex justify-center p-2'>
                    <PrimarySpinner></PrimarySpinner>
                </div>
            )}{' '}
        </div>
    );
};

export default LabelPopover;
