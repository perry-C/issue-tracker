import React, { ReactNode } from 'react';

import { RadiobuttonIcon } from '@radix-ui/react-icons';
import { Strong } from '@radix-ui/themes';

class IssueOpen extends React.Component {
    render(): ReactNode {
        return (
            <div className='flex justify-center items-center bg-iris w-16 h-6 space-x-1 rounded-full'>
                <RadiobuttonIcon className='text-white' />
                <div className='text-xs text-white'>OPEN</div>
            </div>
        );
    }
}

export default IssueOpen;
