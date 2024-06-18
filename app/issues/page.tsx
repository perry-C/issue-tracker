'use client';

import { useEffect, useState } from 'react';

import IssueTable from '@/components/IssueTable';
import IssueTopBar from '../../components/IssueTopBar';
import axios from 'axios';

const IssuesPage = () => {
    const [issues, setIssues] = useState([]);
    const [selectedList, setSelectedList] = useState<boolean[]>([]);

    useEffect(() => {
        axios.get('/api/issues').then((resolve) => {
            const response = JSON.parse(resolve.request.response);
            setIssues(response);
            setSelectedList(Array(response.length).fill(false));
        });
    }, []);

    return (
        <div id='issue-page' className='mx-4'>
            <div id='issue-top-bar'>
                <IssueTopBar></IssueTopBar>
            </div>
            <div id='issue-table'>
                <IssueTable
                    issues={issues}
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                ></IssueTable>
            </div>
        </div>
    );
};

export default IssuesPage;
