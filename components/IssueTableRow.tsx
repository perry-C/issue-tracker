import { Checkbox } from '@radix-ui/themes';
import Link from 'next/link';
import { RadiobuttonIcon } from '@radix-ui/react-icons';
import React from 'react';

interface IssueTableRowProps {
    id: number;
    title: string;
    createdAt: Date;
    createdBy: string;
    assignedTo?: string;
}

const IssueTableRow = (props: IssueTableRowProps) => {
    return (
        <div
            id={`issue-title_${props.id}`}
            className='flex p-2 space-x-2 hover:bg-zinc-100 transition-colors'
        >
            <Checkbox size='3' />
            <div id='issue-status-icon'>
                <RadiobuttonIcon className='size-4 text-iris' />
            </div>
            <Link href={`/issues/${props.id}`}>
                <div id='issue-title' className='hover:text-iris'>
                    <b>{props.title}</b>
                </div>
                <div id='issue-meta-info' className='text-zinc-600'>
                    {`#${props.id} opened at ${props.createdAt} by ${props.createdBy}`}
                </div>
            </Link>
        </div>
    );
};

export default IssueTableRow;
