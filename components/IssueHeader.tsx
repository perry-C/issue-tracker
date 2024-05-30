import { Button, Heading, Separator } from '@radix-ui/themes';

import { Issue } from '@prisma/client';
import IssueOpen from './IssueOpen';
import Link from 'next/link';
import React from 'react';

interface IssueHeaderProps {
    issueInfo?: Issue;
}

const IssueHeader = ({ issueInfo }: IssueHeaderProps) => {
    return (
        <div id='issue-header' className='space-y-3 col-span-4'>
            <div
                id='issue-mainheader'
                className='flex justify-start items-center'
            >
                <Heading size='8'>
                    {issueInfo?.title} #{issueInfo?.id}
                </Heading>
                <div className='ml-auto space-x-1'>
                    <Button variant='outline'>Edit</Button>
                    <Button>
                        <Link href='/issues/new'>New Issue</Link>
                    </Button>
                </div>
            </div>
            <div
                id='issue-subheader'
                className='flex justify-start items-center space-x-1'
            >
                <IssueOpen></IssueOpen>
                <div>
                    {issueInfo?.createdBy} opened this issue{' '}
                    {String(issueInfo?.createdAt)}
                </div>
            </div>
            <Separator size='4' />
        </div>
    );
};

export default IssueHeader;
