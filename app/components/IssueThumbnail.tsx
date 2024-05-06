import React, { PropsWithChildren } from 'react';

import { Checkbox } from '@radix-ui/themes';
import Link from 'next/link';
import { RadiobuttonIcon } from '@radix-ui/react-icons';

const IssueThumbnail = (props: any) => {
    return (
        <li
            id={`issue-title_${props.key}`}
            className='border-b flex p-2 space-x-2 hover:bg-zinc-100'
        >
            <Checkbox size='3' />

            <div id='issue-status-icon'>
                <RadiobuttonIcon className='size-4 text-iris' />
            </div>
            <Link href='/issues'>
                <div id='issue-title' className='hover:text-iris'>
                    <b>{props.children}</b>
                </div>
                <div id='issue-meta-info' className='text-zinc-600'>
                    opened 5 hours ago by perry-C
                </div>
            </Link>
        </li>
    );
};

export default IssueThumbnail;
