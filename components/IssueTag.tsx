import React, { PropsWithChildren } from 'react';

import IssueTagAction from './IssueTagActions';
import { TriangleDownIcon } from '@radix-ui/react-icons';

const IssueTag = ({ children }: PropsWithChildren) => {
    return (
        <li id='issue-toolbar'>
            <IssueTagAction>
                {children}
                <TriangleDownIcon />
            </IssueTagAction>
        </li>
    );
};

export default IssueTag;
