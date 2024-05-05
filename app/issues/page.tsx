'use client';

import { Checkbox } from '@radix-ui/themes';
import IssueTagPopover from '../components/IssueTagPopover';
import Link from 'next/link';
import { RadiobuttonIcon } from '@radix-ui/react-icons';
import React from 'react';

const temp_index = ['issue_1', 'issue_2', 'issue_3', 'issue_4'];
const issueToolbarTags = ['Author', 'Label', 'Assignee', 'Sort'];

const IssuesPage = () => {
    const issueThumbnails = temp_index.map((val, key) => (
        <li id={`issue-title_${key}`} className='border-b flex p-2 space-x-2'>
            <Checkbox />

            <div id='issue-status-icon'>
                <RadiobuttonIcon></RadiobuttonIcon>
            </div>
            <Link href='/issues'>
                <div id='issue-title'>
                    <b>{val}</b>
                </div>
                <div id='issue-meta-info'>opened 5 hours ago by perry-C</div>
            </Link>
        </li>
    ));
    const IssueTags = issueToolbarTags.map((val) => (
        <li id='issue-toolbar'>
            <IssueTagPopover>{val}</IssueTagPopover>
        </li>
    ));

    return (
        <div
            id='issue-display-form'
            className='flex flex-col border-solid border-2'
        >
            <div id='issue-thumbnails-container'>
                <ul id='issue-toolbar' className='flex border-b'>
                    {IssueTags}
                </ul>

                <ul className='flex-col'>{issueThumbnails}</ul>
            </div>
        </div>
    );
};

export default IssuesPage;
