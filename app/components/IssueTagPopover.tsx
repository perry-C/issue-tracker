import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Flex,
    Popover,
    TextArea,
} from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

import { ChatBubbleIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';

const IssueTagPopover = ({ children }: PropsWithChildren) => {
    console.log(children);

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
