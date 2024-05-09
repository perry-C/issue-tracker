'use client';

import React, { useEffect, useState } from 'react';

import { Issue } from '@prisma/client';
import axios from 'axios';

const IssueDetailsPage = ({ params }: { params: { issueId: string } }) => {
    const [issueDetails, setIssueDetails] = useState<Issue>();

    useEffect(() => {
        axios.get(`/api/issues/${params.issueId}`).then((resolve) => {
            const response = JSON.parse(resolve.request.response);
            setIssueDetails(response);
        });
    }, []);

    return <div>{issueDetails && issueDetails.description}</div>;
};

export default IssueDetailsPage;
