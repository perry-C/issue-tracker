import React, { useEffect, useState } from 'react';

import { Label } from '@prisma/client';
import LabelMenuBar from '@/components/LabelMenuBar';
import LabelTableRow from './LabelTableRow';
import { Separator } from '@radix-ui/themes';
import axios from 'axios';

interface Props {
    labels: Label[];
    setLabels: any;
}

const LabelTable = ({ labels, setLabels }: Props) => {
    const labelTableRows = labels.map((label, key) => (
        <li key={key}>
            <Separator size='4' />
            <LabelTableRow
                id={label.id}
                name={label.name}
                description={label.description}
                labels={labels}
                setLabels={setLabels}
            />
        </li>
    ));
    return (
        <div>
            <LabelMenuBar count={labels.length} />
            <ul>{labelTableRows}</ul>
        </div>
    );
};

export default LabelTable;
