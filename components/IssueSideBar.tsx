import {
    ArrowRightIcon,
    DrawingPinIcon,
    GearIcon,
    LockClosedIcon,
    TrashIcon,
} from '@radix-ui/react-icons';
import { Avatar, Inset, Popover, Separator, Strong } from '@radix-ui/themes';
import React, { useEffect } from 'react';

import LabelPopover from './LabelPopover';
import { useRouter } from 'next/navigation';

interface Props {
    issueId: number | undefined;
    handleDeleteIssue: any;
}

const SidebarItem = ({
    name,
    popover,
}: {
    name: string;
    popover: React.JSX.Element;
}) => (
    <div>
        <Popover.Root>
            <Popover.Trigger>
                <button
                    className='flex justify-between items-center 
                    w-full hover:text-iris'
                >
                    <Strong>{name}</Strong>

                    <GearIcon />
                </button>
            </Popover.Trigger>
            <Popover.Content>
                <Inset>{popover}</Inset>
            </Popover.Content>
        </Popover.Root>
        <div>None yet</div>
        <Separator size='4' className='mt-2' />
    </div>
);

const AssigneesPopover = <div></div>;
const LabelsPopover = <LabelPopover />;
const ProjectsPopover = <div></div>;
const MilestonePopover = <div></div>;

const IssueSidebar = (props: Props) => {
    const router = useRouter();

    const handleLockConversation = () => {
        alert('not implemented');
    };

    const handlePinIssue = () => {
        alert('not implemented');
    };

    const handleTransferIssue = () => {
        alert('not implemented');
    };
    const sidebarItems = [
        { id: 0, name: 'Assignees', popover: AssigneesPopover },
        { id: 1, name: 'Labels', popover: LabelsPopover },
        { id: 2, name: 'Projects', popover: ProjectsPopover },
        { id: 3, name: 'Milestones', popover: MilestonePopover },
    ];

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
            method: props.handleDeleteIssue,
        },
    ];

    return (
        <div
            id='sidebar-container'
            className='flex flex-col mx-2 my-2 space-y-2'
        >
            {sidebarItems.map((item) => (
                <SidebarItem
                    key={item.id}
                    name={item.name}
                    popover={item.popover}
                />
            ))}

            <div>5 Participants</div>
            <div
                id='sidebar-participants-container'
                className='flex flex-wrap content-between gap-1'
            >
                <Avatar variant='solid' fallback='A' />
                <Avatar variant='solid' fallback='A' />
                <Avatar variant='solid' fallback='A' />
                <Avatar variant='solid' fallback='A' />
                <Avatar variant='solid' fallback='A' />
            </div>
            <Separator size='4' className='mt-2' />
            {sidebarActions.map((action) => (
                <button
                    key={action.id}
                    onClick={action.method}
                    className='flex justify-start items-center hover:text-iris'
                >
                    <action.icon className='mr-1' />
                    {action.name}
                </button>
            ))}
        </div>
    );
};

export default IssueSidebar;
