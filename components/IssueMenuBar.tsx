import { CheckIcon, RadiobuttonIcon } from '@radix-ui/react-icons';
import { Checkbox, Strong } from '@radix-ui/themes';

import IssueFilterButton from './IssueAction';
import React from 'react';

interface Props {
    selectedList: boolean[];
    handleFullSelect: any;
}

const issueFiltersInfo = [
    { id: 0, name: 'Author' },
    { id: 1, name: 'Label' },
    { id: 2, name: 'Assignee' },
    { id: 3, name: 'Sort' },
];

const issueFilterButtons = issueFiltersInfo.map((tag) => (
    <li key={tag.name} className='flex items-center'>
        <IssueFilterButton>{tag.name}</IssueFilterButton>
    </li>
));

const IssueMenuBar = (props: Props) => {
    return (
        <div
            id='issue-menu-bar'
            className='flex justify-end items-center bg-zinc-100'
        >
            <div className='flex mr-auto ml-2 space-x-2 items-center'>
                <Checkbox
                    id='issue-full-select'
                    variant='classic'
                    size='3'
                    className='mr-auto'
                    onClick={props.handleFullSelect}
                />
                <button
                    id='issue-opened'
                    className='flex items-center space-x-2'
                >
                    <RadiobuttonIcon className='size-4 ' />
                    <div>
                        <Strong>
                            {
                                props.selectedList.filter(
                                    (item) => item === true
                                ).length
                            }{' '}
                            Opened
                        </Strong>
                    </div>
                </button>
                <button
                    id='issue-closed'
                    className='flex items-center space-x-2 text-zinc-500 hover:text-black transition-colors'
                >
                    <CheckIcon className='size-4' />
                    <div>
                        {
                            props.selectedList.filter((item) => item === false)
                                .length
                        }{' '}
                        Closed
                    </div>
                </button>
            </div>

            {issueFilterButtons}
        </div>
    );
};

export default IssueMenuBar;
