import { Button, Strong } from '@radix-ui/themes';

import { ArrowDownIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {}

const LabelMenuBar = (props: Props) => {
    return (
        <div
            id='issue-menu-bar'
            className='flex justify-between p-2 space-x-2 items-center bg-zinc-100'
        >
            <div>
                <Strong>9 labels</Strong>
            </div>
            <Button variant='ghost'>
                Sort <ArrowDownIcon />
            </Button>
        </div>
    );
};

export default LabelMenuBar;
