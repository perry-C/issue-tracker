import { Card, Inset, Separator } from '@radix-ui/themes';

import { IssueComment } from '@prisma/client';
import TimelineCommentActions from './TimelineCommentActions';

interface TimelineCommentMetaData extends IssueComment {
    comments?: IssueComment[];
    setComments?: any;
}

const TimelineComment = (props: TimelineCommentMetaData) => (
    <Card className='text-sm'>
        <Inset clip='padding-box' side='top' pb='current'>
            <div
                id='timeline-comment-header'
                className='flex justify-between items-center p-2 bg-violet-300'
            >
                <div>
                    <b>{props.createdBy}</b> commented at{' '}
                    {String(props.createdAt)}
                </div>
                <TimelineCommentActions
                    issueId={props.issueId}
                    commentId={props.id}
                    comments={props.comments}
                    setComments={props.setComments}
                />
            </div>

            <Separator orientation='horizontal' size='4' />
        </Inset>

        <div id='timeline-comment-text'>{props.description}</div>
    </Card>
);

export default TimelineComment;
