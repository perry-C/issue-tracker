'use client';

import { Card, Inset, Separator } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import { Issue } from '@prisma/client';
import IssueTable from '@/components/IssueTable';
import IssueTableRow from '../../components/IssueTableRow';
import IssueTag from '../../components/IssueAction';
import IssueTopBar from '../../components/IssueTopBar';
import axios from 'axios';

const IssuesPage = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        axios.get('/api/issues').then((resolve) => {
            const response = JSON.parse(resolve.request.response);
            setIssues(response);
        });
    }, []);

    return (
        <div id='issue-page' className='mx-4'>
            <div id='issue-top-bar'>
                <IssueTopBar></IssueTopBar>
            </div>
            <div id='issue-table'>
                <IssueTable issues={issues}></IssueTable>
            </div>
        </div>
    );
};

export default IssuesPage;
