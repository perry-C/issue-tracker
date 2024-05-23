import { Button, Select, TextField } from '@radix-ui/themes';

import Link from 'next/link';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';

const IssueActions = () => {
    return (
        <div
            id='issue-action-bar'
            className='flex justify-center px-4 mb-5 space-x-4'
        >
            <div id='issue-filter' className='flex'>
                <Select.Root size='2' defaultValue='apple'>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Item value='apple'>Apple</Select.Item>
                        <Select.Item value='orange'>Orange</Select.Item>
                    </Select.Content>
                </Select.Root>
                <TextField.Root size='2' placeholder='Search the docs…'>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height='16' width='16' />
                    </TextField.Slot>
                </TextField.Root>
            </div>
            <div id='issue-labels'>
                <Button variant='outline'>Label</Button>
            </div>
            <div id='issue-milestones'>
                <Button variant='outline'>Milestones</Button>
            </div>
            <Button>
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </div>
    );
};

export default IssueActions;
