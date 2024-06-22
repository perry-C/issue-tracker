import { Button, Heading, Separator, TextField } from '@radix-ui/themes';
import React, { useEffect, useRef, useState } from 'react';

import { Issue } from '@prisma/client';
import IssueOpen from './IssueOpen';
import Link from 'next/link';
import axios from 'axios';

interface IssueHeaderProps {
    issueInfo?: Issue;
    issueTitle: string;
    setIssueTitle: any;
}

const IssueHeader = ({
    issueInfo,
    issueTitle,
    setIssueTitle,
}: IssueHeaderProps) => {
    const [isEditTitle, setIsEditTitle] = useState(false);
    // ! Debugging
    // const [isEditTitle, setIsEditTitle] = useState(true);
    const titleInputRef = useRef<any>(null);

    const handleEditTitle = () => {
        // TODO: client side update on the change
        // 1. spawn a input text field which replaces the original title
        // 1.1 use a boolean value "OnEditTitle" to turn on and off the input text field
        setIsEditTitle(true);
        // TODO: server side update on the title
    };

    const HandleEditCancel = () => {
        setIsEditTitle(false);
    };

    const HandleEditSave = async () => {
        setIssueTitle(titleInputRef.current.value);

        await axios
            .patch(
                `/api/issues/${issueInfo?.id}/`,
                {
                    newField: titleInputRef.current.value,
                },
                {
                    headers: {
                        fieldToUpdate: 'title',
                    },
                }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        setIsEditTitle(false);
    };
    const TitleInputField = () => (
        <TextField.Root
            variant='classic'
            defaultValue={issueInfo?.title}
            className='flex-grow'
            size='2'
            ref={titleInputRef}
        >
            <TextField.Slot></TextField.Slot>
        </TextField.Root>
    );

    useEffect(() => {
        if (isEditTitle) {
            titleInputRef.current?.focus();
        }
    }, [isEditTitle]);

    return (
        <div id='issue-header' className='space-y-3 col-span-4'>
            {isEditTitle ? (
                <div
                    id='issue-mainheader-edit'
                    className='flex space-x-2 items-center'
                >
                    <TitleInputField></TitleInputField>
                    <Button onClick={HandleEditSave} variant='surface'>
                        Save
                    </Button>

                    <Button onClick={HandleEditCancel} variant='ghost'>
                        Cancel
                    </Button>
                </div>
            ) : (
                <div
                    id='issue-mainheader'
                    className='flex justify-start items-center'
                >
                    <Heading size='8'>
                        {issueTitle} #{issueInfo?.id}
                    </Heading>
                    <div className='ml-auto space-x-1'>
                        <Button variant='outline' onClick={handleEditTitle}>
                            Edit
                        </Button>
                        <Button>
                            <Link href='/issues/new'>New Issue</Link>
                        </Button>
                    </div>
                </div>
            )}
            <div
                id='issue-subheader'
                className='flex justify-start items-center space-x-1'
            >
                <IssueOpen></IssueOpen>
                <div>
                    {issueInfo?.createdBy} opened this issue{' '}
                    {String(issueInfo?.createdAt)}
                </div>
            </div>
            <Separator size='4' />
        </div>
    );
};

export default IssueHeader;
