import {
    Button,
    Card,
    Flex,
    Inset,
    Popover,
    Select,
    Separator,
    Strong,
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
            variant='classic'
        >
            <TextField.Slot>
                <Popover.Root>
                    <Popover.Trigger>
                        <InsetButton>
                            <Strong>Filters</Strong>
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
        <Card variant='classic'>
            <Inset
                className='flex justify-center items-center w-48'
                clip='padding-box'
            >
                <div
                    id='issue-labels'
                    className='flex flex-grow justify-center'
                >
                    <InsetButton>
                        <Strong>Labels</Strong>
                    </InsetButton>
                </div>
                <Separator size='2' orientation='vertical' />
                <div
                    id='issue-milestones'
                    className='flex flex-grow justify-center'
                >
                    <InsetButton>
                        <Strong>Milestones</Strong>
                    </InsetButton>
                </div>
            </Inset>
        </Card>
    );
    const newIssue = (
        <Button>
            <Link href='/issues/new'>
                <Strong>New Issue</Strong>
            </Link>
        </Button>
    );
    return (
        <div id='issue-top-bar' className='flex justify-between mb-5'>
            {issueSearch}
            {labelsAndMilestones}
            {newIssue}
        </div>
    );
};

export default IssueTopBar;
