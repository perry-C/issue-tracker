import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { IssueComment } from '@prisma/client';
import { Popover } from '@radix-ui/themes';
import React from 'react';
import axios from 'axios';

interface TimelineCommentMetaData {
    issueId: number;
    commentId: number;
    comments?: IssueComment[];
    setComments?: any;
}

const TimelineCommentActions = (props: TimelineCommentMetaData) => {
    const deleteAction = async () => {
        // TODO: call api request to server in order to delete comment
        await axios.delete(`/api/issues/${props.issueId}/${props.commentId}`);
        props.setComments(
            props.comments?.filter((comment) => comment.id !== props.commentId)
        );
    };
    const hideAction = () => console.log('hideAction');
    const editAction = () => console.log('editAction');

    const timelineCommentActionButtons = [
        {
            name: 'Edit',
            action: editAction,
        },
        {
            name: 'Hide',
            action: hideAction,
        },
        {
            name: 'Delete',
            action: deleteAction,
        },
    ];

    return (
        <div id='timeline-comment-actions'>
            <div className='hover:text-iris'>
                <Popover.Root>
                    <Popover.Trigger>
                        <button>
                            <DotsHorizontalIcon />
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        {timelineCommentActionButtons.map((item) => (
                            <button
                                onClick={item.action}
                                className='flex flex-col hover:text-iris'
                            >
                                {item.name}
                            </button>
                        ))}
                    </Popover.Content>
                </Popover.Root>
            </div>
        </div>
    );
};

export default TimelineCommentActions;
