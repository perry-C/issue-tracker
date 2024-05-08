import { Button, Popover } from '@radix-ui/themes';

import { PropsWithChildren } from 'react';

const IssueTagPopover = ({ children }: PropsWithChildren) => {
    return (
        <div className='p-4'>
            <Popover.Root>
                <Popover.Trigger>
                    <Button variant='ghost'>{children}</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <div>contents of a tag popover</div>
                </Popover.Content>
            </Popover.Root>
        </div>
    );
};

export default IssueTagPopover;
