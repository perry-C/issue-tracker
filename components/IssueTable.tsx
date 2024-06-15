import { Card, Checkbox, Inset, Separator, Strong } from '@radix-ui/themes';
import { CheckIcon, RadiobuttonIcon } from '@radix-ui/react-icons';

import { Issue } from '@prisma/client';
import IssueFilterButton from './IssueAction';
import IssueTableRow from './IssueTableRow';
import { useState } from 'react';

interface Props {
    issues: Issue[];
    selectedList: boolean[];
    setSelectedList: any;
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

const IssueTable = ({ issues, selectedList, setSelectedList }: Props) => {
    const [fullSelect, setFullSelect] = useState(false);

    const handleSelect = (rowId: number) => {
        const newSelected = selectedList.map((item, index) =>
            index === rowId ? !item : item
        );
        setSelectedList(newSelected);
    };

    const handleFullSelect = () => {
        const newSelected = Array(selectedList.length).fill(!fullSelect);
        setFullSelect(!fullSelect);
        setSelectedList(newSelected);
    };

    const issueTableRows = issues.map((val: Issue, key: number) => (
        <li key={key}>
            <Separator size='4' />
            <IssueTableRow
                rowId={key}
                selected={selectedList[key]}
                handleSelect={handleSelect}
                {...val}
            />
        </li>
    ));
    return (
        <Card className='flex flex-col' variant='classic'>
            <Inset>
                <ul
                    id='issue-menu-bar'
                    className='flex justify-end items-center bg-zinc-100'
                >
                    <div className='flex mr-auto ml-2 space-x-2 items-center'>
                        <Checkbox
                            id='issue-full-select'
                            variant='classic'
                            size='3'
                            className='mr-auto'
                            onClick={handleFullSelect}
                        />
                        <button
                            id='issue-opened'
                            className='flex items-center space-x-2'
                        >
                            <RadiobuttonIcon className='size-4 ' />
                            <div>
                                <Strong>
                                    {
                                        selectedList.filter(
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
                                    selectedList.filter(
                                        (item) => item === false
                                    ).length
                                }{' '}
                                Closed
                            </div>
                        </button>
                    </div>

                    {issueFilterButtons}
                </ul>

                <ul className='flex-col'>{issueTableRows}</ul>
            </Inset>
        </Card>
    );
};

export default IssueTable;
