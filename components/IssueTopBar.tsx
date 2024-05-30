import {
    Button,
    Card,
    Flex,
    Inset,
    Popover,
    Select,
    Separator,
    TextField,
} from '@radix-ui/themes';
import { MagnifyingGlassIcon, TriangleDownIcon } from '@radix-ui/react-icons';

import InsetButton from './InsetButton';
import Link from 'next/link';
import React from 'react';

const IssueTopBar = () => {
    const issueSearch = (
        <TextField.Root
            className='w-2/3'
            size='2'
            placeholder='Search the docs…'
        >
            <TextField.Slot>
                <Popover.Root>
                    <Popover.Trigger>
                        <InsetButton>
                            Filters
                            <TriangleDownIcon />
                        </InsetButton>
                    </Popover.Trigger>
                    <Popover.Content></Popover.Content>
                </Popover.Root>
                <MagnifyingGlassIcon height='16' width='16' />
            </TextField.Slot>
        </TextField.Root>
    );
    const labelsAndMilestones = (
        <Card>
            <Inset
                className='flex items-center space-x-3'
                clip='padding-box'
                px='current'
            >
                <div id='issue-labels'>
                    <InsetButton>Labels</InsetButton>
                </div>
                <Separator size='2' orientation='vertical' />
                <div id='issue-milestones'>
                    <InsetButton>Milestones</InsetButton>
                </div>
            </Inset>
        </Card>
    );
    const newIssue = (
        <Button>
            <Link href='/issues/new'>New Issue</Link>
        </Button>
    );
    return (
        <div
            id='issue-top-bar'
            className='flex justify-center px-4 mb-5 space-x-4'
        >
            {issueSearch}
            {labelsAndMilestones}
            {newIssue}
        </div>
    );
};

export default IssueTopBar;
