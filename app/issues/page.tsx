'use client';

import { Card, Inset, Separator } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import { Issue } from '@prisma/client';
import IssueTableRow from '../../components/IssueTableRow';
import IssueTag from '../../components/IssueAction';
import IssueTopBar from '../../components/IssueTopBar';
import axios from 'axios';

const issueActionsInfo = [
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

    const issueTableRows = issues.map((val: Issue, key: number) => (
        <li>
            <Separator size='4' />
            <IssueTableRow key={val.id} {...val} />
        </li>
    ));

    const issueActions = issueActionsInfo.map((tag) => (
        <li className='flex items-center'>
            <IssueTag key={tag.name}>{tag.name}</IssueTag>
        </li>
    ));

    return (
        <div id='issue-page'>
            <div id='issue-top-bar'>
                <IssueTopBar></IssueTopBar>
            </div>
            <div id='issue-table' className='flex flex-col'>
                <Card>
                    <Inset>
                        <ul
                            id='issue-actions'
                            className='flex justify-end bg-zinc-100'
                        >
                            {issueActions}
                        </ul>

                        <ul className='flex-col'>{issueTableRows}</ul>
                    </Inset>
                </Card>
            </div>
        </div>
    );
};

export default IssuesPage;
