'use client';

import { useEffect, useState } from 'react';

import IssueActionBar from '../components/IssueActionBar';
import IssueTag from '../components/IssueTag';
import IssueThumbnail from '../components/IssueThumbnail';
import axios from 'axios';
import { issue } from '@prisma/client';

const issueToolbarTags = ['Author', 'Label', 'Assignee', 'Sort'];

const IssuesPage = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        axios.get('/api/issues').then((resolve) => {
            const response = JSON.parse(resolve.request.response);
            setIssues(response);
        });
    }, []);

    const issueThumbnails = issues.map((val: issue, key: number) => (
        <IssueThumbnail {...val} openedAt='5 hours ago' openedBy='perry-c' />
    ));

    const IssueTags = issueToolbarTags.map((val) => <IssueTag>{val}</IssueTag>);

    return (
        <div id='issue-page'>
            <IssueActionBar></IssueActionBar>
            <div
                id='issue-display-form'
                className='flex flex-col border-solid border-2'
            >
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
