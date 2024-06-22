import { Card, Checkbox, Inset, Separator, Strong } from '@radix-ui/themes';
import { CheckIcon, RadiobuttonIcon } from '@radix-ui/react-icons';

import { Issue } from '@prisma/client';
import IssueMenuBar from './IssueMenuBar';
import IssueTableRow from './IssueTableRow';
import { useState } from 'react';

interface Props {
    issues: Issue[];
    selectedList: boolean[];
    setSelectedList: any;
}

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
                <IssueMenuBar
                    handleFullSelect={handleFullSelect}
                    selectedList={selectedList}
                />
                <ul className='flex-col'>{issueTableRows}</ul>
            </Inset>
        </Card>
    );
};

export default IssueTable;
