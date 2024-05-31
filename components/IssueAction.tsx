import { Button, Popover } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

import { TriangleDownIcon } from '@radix-ui/react-icons';

const IssueFilterButton = ({ children }: PropsWithChildren) => {
    return (
        <div id='issue-toolbar'>
            <div className='p-4'>
                <Popover.Root>
                    <Popover.Trigger>
                        <Button variant='ghost'>
                            {children} <TriangleDownIcon />
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <div>contents of a tag popover</div>
                    </Popover.Content>
                </Popover.Root>
            </div>
        </div>
    );
};

export default IssueFilterButton;
