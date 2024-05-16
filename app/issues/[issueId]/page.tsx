'use client';

import 'easymde/dist/easymde.min.css';

import { Box, Button, Card, Heading, Inset, Separator } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

import { Controller } from 'react-hook-form';
import DiscussionThread from '@/components/DiscussionThread';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Issue } from '@prisma/client';
import IssueHeader from '@/components/IssueHeader';
import IssueOpen from '@/components/IssueOpen';
import IssueSidebar from '@/components/IssueSidebar';
import Link from 'next/link';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import classnames from 'classnames';

const temp = [1, 2];

const IssueDetailsPage = ({ params }: { params: { issueId: string } }) => {
    const [issueInfo, setIssueInfo] = useState<Issue>();

    useEffect(() => {
        axios.get(`/api/issues/${params.issueId}`).then((resolve) => {
            const response = JSON.parse(resolve.request.response);
            setIssueInfo(response);
        });
    }, []);

    return (
        <div
            id='issue-description-wrapper'
            className='grid grid-cols-4 space-y-3'
        >
            <IssueHeader issueInfo={issueInfo}></IssueHeader>
            <div id='issue-discussion' className='col-span-3'>
                {temp.map(() => (
                    <>
                        <DiscussionThread></DiscussionThread>
                        <Separator
                            className='ml-2'
                            orientation='vertical'
                            size='2'
                        ></Separator>
                    </>
                ))}
                <Separator size='4' className='mb-3'></Separator>
                <div id='issue-discussion-new'>
                    <form>
                        <SimpleMDE placeholder='Add your comment here...'></SimpleMDE>
                    </form>

                    <div
                        id='issue-discussion-new-action-group'
                        className='flex justify-end space-x-1 mt-1'
                    >
                        <Button variant='outline'>Close issue</Button>
                        {/* <Button disabled={isSubmitting}> */}
                        <Button>
                            Comment
                            {/* {isSubmitting && <Spinner></Spinner>} */}
                        </Button>
                    </div>
                </div>
            </div>
            <div id='issue-sidebar' className='col-span-1 m-2'>
                <IssueSidebar issueId={issueInfo?.id}></IssueSidebar>
            </div>
        </div>
    );
};

export default IssueDetailsPage;
