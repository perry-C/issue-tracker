import React, { PropsWithChildren } from 'react';

import IssueTagPopover from './IssueTagPopover';
import { TriangleDownIcon } from '@radix-ui/react-icons';

const IssueTag = ({ children }: PropsWithChildren) => {
    return (
        <li id='issue-toolbar'>
            <IssueTagPopover>
                {children}
                <TriangleDownIcon />
            </IssueTagPopover>
        </li>
    );
};

export default IssueTag;
