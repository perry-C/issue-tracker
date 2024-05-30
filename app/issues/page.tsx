'use client';

import { useEffect, useState } from 'react';

import { Issue } from '@prisma/client';
import IssueTag from '../../components/IssueTag';
import IssueThumbnail from '../../components/IssueThumbnail';
import IssueTopBar from '../../components/IssueTopBar';
import { Separator } from '@radix-ui/themes';
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
        <li>
            <IssueThumbnail key={val.id} {...val} />
            <Separator size='4' />
        </li>
    ));

    const IssueTags = issueToolbarTags.map((tag) => (
        <li className='flex items-center'>
            <IssueTag key={tag.name}>{tag.name}</IssueTag>
            <Separator size='2' orientation='vertical' />
        </li>
    ));

    return (
        <div id='issue-page'>
            <IssueTopBar></IssueTopBar>
            <div id='issue-display-form' className='flex flex-col'>
                <ul id='issue-toolbar' className='flex justify-end g-zinc-100'>
                    {IssueTags}
                </ul>
                <Separator size='4' />
                <ul className='flex-col'>{issueThumbnails}</ul>
            </div>
        </div>
    );
};

export default IssuesPage;
