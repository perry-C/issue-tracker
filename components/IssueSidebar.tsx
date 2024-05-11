import { Button, Popover, Separator } from '@radix-ui/themes';

import { GearIcon } from '@radix-ui/react-icons';
import React from 'react';

const sidebarItems = ['Assignees', 'Labels', 'Projects', 'Milestones'];

const IssueSidebar = () => {
    return (
        <div id='sidebar-wrapper' className='flex flex-col flex-grow-3'>
            {sidebarItems.map((val) => (
                <div className='sidebar-item-wrapper mx-2 my-2'>
                    <Popover.Root>
                        <Popover.Trigger>
                            <button
                                className='flex justify-between items-center 
                            w-full hover:text-iris'
                            >
                                {val}
                                <GearIcon />
                            </button>
                        </Popover.Trigger>
                        <Popover.Content>Content</Popover.Content>
                    </Popover.Root>
                    <div>None yet</div>
                    <Separator size='4' className='mt-2'></Separator>
                </div>
            ))}
        </div>
    );
};

export default IssueSidebar;
