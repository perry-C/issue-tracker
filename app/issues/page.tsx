'use client';

import { RadiobuttonIcon, TriangleDownIcon } from '@radix-ui/react-icons';

import { Checkbox } from '@radix-ui/themes';
import IssueTagPopover from '../components/IssueTagPopover';
import Link from 'next/link';
import React from 'react';

const temp_index = ['issue_1', 'issue_2', 'issue_3', 'issue_4'];
const issueToolbarTags = ['Author', 'Label', 'Assignee', 'Sort'];

const IssuesPage = () => {
    const issueThumbnails = temp_index.map((val, key) => (
        <li
            id={`issue-title_${key}`}
            className='border-b flex p-2 space-x-2 hover:bg-zinc-100'
        >
            <Checkbox size='3' />

            <div id='issue-status-icon'>
                <RadiobuttonIcon className='size-4 text-iris' />
            </div>
            <Link href='/issues'>
                <div id='issue-title'>
                    <b>{val}</b>
                </div>
                <div id='issue-meta-info' className='text-zinc-600'>
                    opened 5 hours ago by perry-C
                </div>
            </Link>
        </li>
    ));
    const IssueTags = issueToolbarTags.map((val) => (
        <li id='issue-toolbar'>
            <IssueTagPopover>
                {val}
                <TriangleDownIcon />
            </IssueTagPopover>
        </li>
    ));

    return (
        <div
            id='issue-display-form'
            className='flex flex-col border-solid border-2'
        >
            <div id='issue-thumbnails-container'>
                <ul
                    id='issue-toolbar'
                    className='flex justify-end border-b bg-zinc-100'
                >
                    {IssueTags}
                </ul>

                <ul className='flex-col'>{issueThumbnails}</ul>
            </div>
        </div>
    );
};

export default IssuesPage;
