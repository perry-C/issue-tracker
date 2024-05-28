import {
    ArrowRightIcon,
    DrawingPinIcon,
    GearIcon,
    LockClosedIcon,
    TrashIcon,
} from '@radix-ui/react-icons';
import { Popover, Separator } from '@radix-ui/themes';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const sidebarItems = ['Assignees', 'Labels', 'Projects', 'Milestones'];

const sidebarActionButtons = [
    { name: 'Lock conversation', icon: LockClosedIcon },
    { name: 'Pin issue', icon: DrawingPinIcon },
    { name: 'Transfer issue', icon: ArrowRightIcon },
    { name: 'Delete issue', icon: TrashIcon },
];

const SidebarItem = ({ item }: { item: string }) => (
    <div>
        <Popover.Root>
            <Popover.Trigger>
                <button
                    className='flex justify-between items-center 
                    w-full hover:text-iris'
                >
                    {item}
                    <GearIcon />
                </button>
            </Popover.Trigger>
            <Popover.Content>Content</Popover.Content>
        </Popover.Root>
        <div>None yet</div>
        <Separator size='4' className='mt-2'></Separator>
    </div>
);

interface Props {
    issueId: number | undefined;
}

const IssueSidebar = (props: Props) => {
    const router = useRouter();
    const OnDeleteIssue = async () => {
        try {
            await axios.delete(`/api/issues/${props.issueId}`);
            router.push('/issues');
        } catch (error) {
            console.log(error);
            alert('Issue can not be deleted');
        }
    };

    return (
        <div
            id='sidebar-container'
            className='flex flex-col flex-grow-3 mx-2 my-2'
        >
            <div id='sidebar-items'></div>
            {sidebarItems.map((item) => (
                <SidebarItem item={item} />
            ))}
            <Separator size='4' className='mt-2'></Separator>
            <ul>
                {sidebarActionButtons.map((item) => (
                    <li>
                        <button
                            onClick={OnDeleteIssue}
                            className='flex justify-start items-center hover:text-iris'
                        >
                            {item.name}
                            <item.icon className='ml-1' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IssueSidebar;
