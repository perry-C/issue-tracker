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
        <Separator size='4' className='mt-2' />
    </div>
);

interface Props {
    issueId: number | undefined;
}

const IssueSidebar = (props: Props) => {
    const router = useRouter();

    const sidebarItems = [
        { id: 0, name: 'Assignees' },
        { id: 1, name: 'Labels' },
        { id: 2, name: 'Projects' },
        { id: 3, name: 'Milestones' },
    ];

    const handleLockConversation = () => {
        alert('not implemented');
    };

    const handlePinIssue = () => {
        alert('not implemented');
    };

    const handleTransferIssue = () => {
        alert('not implemented');
    };

    const handleDeleteIssue = async () => {
        try {
            await axios.delete(`/api/issues/${props.issueId}`);
            router.push('/issues');
        } catch (error) {
            console.error(error);
        }
    };

    const sidebarActions = [
        {
            id: 0,
            name: 'Lock conversation',
            icon: LockClosedIcon,
            method: handleLockConversation,
        },
        {
            id: 1,
            name: 'Pin issue',
            icon: DrawingPinIcon,
            method: handlePinIssue,
        },
        {
            id: 2,
            name: 'Transfer issue',
            icon: ArrowRightIcon,
            method: handleTransferIssue,
        },
        {
            id: 3,
            name: 'Delete issue',
            icon: TrashIcon,
            method: handleDeleteIssue,
        },
    ];

    return (
        <div
            id='sidebar-container'
            className='flex flex-col flex-grow-3 mx-2 my-2'
        >
            <div id='sidebar-items'></div>
            {sidebarItems.map((item) => (
                <SidebarItem key={item.id} item={item.name} />
            ))}
            <Separator size='4' className='mt-2' />
            <ul>
                {sidebarActions.map((action) => (
                    <li key={action.id}>
                        <button
                            onClick={action.method}
                            className='flex justify-start items-center hover:text-iris'
                        >
                            {action.name}
                            <action.icon className='ml-1' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IssueSidebar;
