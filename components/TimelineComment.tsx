import { Button, Card, Inset, Popover, Separator } from '@radix-ui/themes';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { IssueComment } from '@prisma/client';
import React from 'react';

const TimelineComment = (props: IssueComment) => (
    <Card className='text-sm'>
        <Inset clip='padding-box' side='top' pb='current'>
            <div
                id='discussion-info'
                className='flex justify-between items-center p-2 bg-violet-300'
            >
                <div>
                    <b>{props.createdBy}</b> commented at{' '}
                    {String(props.createdAt)}
                </div>
                <div id='discussion-actions'>
                    <button className='hover:text-iris'>
                        <Popover.Root>
                            <Popover.Trigger>
                                <button>
                                    <DotsHorizontalIcon />
                                </button>
                            </Popover.Trigger>
                            <Popover.Content>
                                <div>contents of a tag popover</div>
                            </Popover.Content>
                        </Popover.Root>
                    </button>
                </div>
            </div>

            <Separator orientation='horizontal' size='4' />
        </Inset>

        <div id='discussion-text'>{props.description}</div>
    </Card>
);

export default TimelineComment;
