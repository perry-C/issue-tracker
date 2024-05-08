import { Checkbox } from '@radix-ui/themes';
import Link from 'next/link';
import { RadiobuttonIcon } from '@radix-ui/react-icons';
import React from 'react';

interface ThumbnailMetadata {
    id: number;
    title: string;
    openedAt: string;
    openedBy: string;
    assignedTo?: string;
}

const IssueThumbnail = (props: ThumbnailMetadata) => {
    return (
        <li
            id={`issue-title_${props.id}`}
            className='border-b flex p-2 space-x-2 hover:bg-zinc-100'
        >
            <Checkbox size='3' />

            <div id='issue-status-icon'>
                <RadiobuttonIcon className='size-4 text-iris' />
            </div>
            <Link href='/issues'>
                <div id='issue-title' className='hover:text-iris'>
                    <b>{props.title}</b>
                </div>
                <div id='issue-meta-info' className='text-zinc-600'>
                    {`opened at ${props.openedAt} by ${props.openedBy}`}
                </div>
            </Link>
        </li>
    );
};

export default IssueThumbnail;
