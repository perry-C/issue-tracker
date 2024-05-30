import React, { PropsWithChildren } from 'react';

import IssueTagAction from './IssueTagActions';
import { TriangleDownIcon } from '@radix-ui/react-icons';

const IssueTag = ({ children }: PropsWithChildren) => {
    return (
        <div id='issue-toolbar'>
            <IssueTagAction>
                {children}
                <TriangleDownIcon />
            </IssueTagAction>
        </div>
    );
};

export default IssueTag;
