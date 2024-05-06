'use client';

import IssueActionBar from '../components/IssueActionBar';
import IssueTag from '../components/IssueTag';
import IssueTagPopover from '../components/IssueTagPopover';
import IssueThumbnail from '../components/IssueThumbnail';
import { TriangleDownIcon } from '@radix-ui/react-icons';

const temp_index = ['issue_1', 'issue_2', 'issue_3', 'issue_4'];
const issueToolbarTags = ['Author', 'Label', 'Assignee', 'Sort'];

const IssuesPage = () => {
    const issueThumbnails = temp_index.map((val, key) => (
        <IssueThumbnail key={key}>{val}</IssueThumbnail>
    ));

    const IssueTags = issueToolbarTags.map((val) => <IssueTag>{val}</IssueTag>);

    return (
        <div id='issue-page'>
            <IssueActionBar></IssueActionBar>
            <div
                id='issue-display-form'
                className='flex flex-col border-solid border-2'
            >
                <ul
                    id='issue-toolbar'
                    className='flex justify-end border-b bg-zinc-100'
                >
                    {IssueTags}
                </ul>

                <ul className='flex-col'>{issueThumbnails}</ul>
            </div>
        </div>
    );
};

export default IssuesPage;
