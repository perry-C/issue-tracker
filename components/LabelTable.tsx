import LabelMenuBar from '@/components/LabelMenuBar';
import LabelTableRow from './LabelTableRow';
import React from 'react';
import { Separator } from '@radix-ui/themes';

interface Props {}
// Temp for now, officially we need to fetch it from a database
const labels = [
    { name: 'bug', description: "Something isn't working" },
    {
        name: 'major-feature',
        description: 'Features that achieves something important',
    },
    { name: 'quality-of-life', description: 'Small features' },
];

const labelTableRows = labels.map((label, key) => (
    <li key={key}>
        <Separator size='4' />
        <LabelTableRow
            id={key}
            name={label.name}
            description={label.description}
        />
    </li>
));

const LabelTable = (props: Props) => {
    return (
        <div>
            <LabelMenuBar />
            <ul>{labelTableRows}</ul>
        </div>
    );
};

export default LabelTable;
