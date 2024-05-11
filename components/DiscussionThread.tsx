import { Button, Card, Inset, Separator } from '@radix-ui/themes';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import React from 'react';

const DiscussionThread = () => (
    <Card className='text-sm'>
        <Inset clip='padding-box' side='top' pb='current'>
            <div
                id='discussion-info'
                className='flex justify-between items-center p-2 bg-violet-300'
            >
                <div>
                    <b>perry-c</b> commented at 5 hours ago
                </div>
                <div id='discussion-actions'>
                    <button className='hover:text-iris'>
                        <DotsHorizontalIcon />
                    </button>
                </div>
            </div>

            <Separator orientation='horizontal' size='4' />
        </Inset>

        <div id='discussion-text'>No description here</div>
    </Card>
);

export default DiscussionThread;
