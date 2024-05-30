import { Card, Inset, Separator } from '@radix-ui/themes';

import { Issue } from '@prisma/client';
import IssueAction from './IssueAction';
import IssueTableRow from './IssueTableRow';
import React from 'react';

interface Props {
    issues: Issue[];
}

const issueActionsInfo = [
    { id: 0, name: 'Author' },
    { id: 1, name: 'Label' },
    { id: 2, name: 'Assignee' },
    { id: 3, name: 'Sort' },
];

const issueActions = issueActionsInfo.map((tag) => (
    <li className='flex items-center'>
        <IssueAction key={tag.name}>{tag.name}</IssueAction>
    </li>
));

const IssueTable = (props: Props) => {
    const issueTableRows = props.issues.map((val: Issue, key: number) => (
        <li>
            <Separator size='4' />
            <IssueTableRow key={val.id} {...val} />
        </li>
    ));
    return (
        <Card className='flex flex-col'>
            <Inset>
                <ul id='issue-actions' className='flex justify-end bg-zinc-100'>
                    {issueActions}
                </ul>

                <ul className='flex-col'>{issueTableRows}</ul>
            </Inset>
        </Card>
    );
};

export default IssueTable;
