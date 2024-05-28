'use client';

import { useEffect, useState } from 'react';

import { Issue } from '@prisma/client';
import IssueActions from '../../components/IssueActions';
import IssueTag from '../../components/IssueTag';
import IssueThumbnail from '../../components/IssueThumbnail';
import axios from 'axios';

const issueToolbarTags = [
    { id: 0, name: 'Author' },
    { id: 1, name: 'Label' },
    { id: 2, name: 'Assignee' },
    { id: 3, name: 'Sort' },
];

const IssuesPage = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        axios.get('/api/issues').then((resolve) => {
            const response = JSON.parse(resolve.request.response);
            setIssues(response);
        });
    }, []);

    const issueThumbnails = issues.map((val: Issue, key: number) => (
        <IssueThumbnail key={val.id} {...val} />
    ));

    const IssueTags = issueToolbarTags.map((tag) => (
        <IssueTag key={tag.name}>{tag.name}</IssueTag>
    ));

    return (
        <div id='issue-page'>
            <IssueActions></IssueActions>
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
