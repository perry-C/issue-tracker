'use client';

import 'easymde/dist/easymde.min.css';

import { Button, Separator } from '@radix-ui/themes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IssueComment, Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';

import ErrorMessage from '@/components/ErrorMessage';
import IssueHeader from '@/components/IssueHeader';
import IssueSidebar from '@/components/IssueSidebar';
import SimpleMDE from 'react-simplemde-editor';
import Spinner from '@/components/Spinner';
import TimelineComment from '@/components/TimelineComment';
import axios from 'axios';
import { createIssueCommentSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type IssueCommentInput = z.infer<typeof createIssueCommentSchema>;
type IssueWithComments = Prisma.IssueGetPayload<{
    include: { comments: true };
}>;
const IssueDetailsPage = ({ params }: { params: { issueId: string } }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueCommentInput>({
        resolver: zodResolver(createIssueCommentSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [issueInfo, setIssueInfo] = useState<IssueWithComments>();

    const fetchIssueComments = () =>
        axios.get(`/api/issues/${params.issueId}`).then((resolve) => {
            const response = JSON.parse(resolve.request.response);
            setIssueInfo(response);
        });

    useEffect(() => {
        fetchIssueComments();
    }, []);

    const onSubmit: SubmitHandler<IssueCommentInput> = async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post(`/api/issues/${params.issueId}`, data);
            fetchIssueComments();
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
            console.log(error);
        }
    };

    return (
        <div
            id='issue-description-container'
            className='grid grid-cols-4 space-y-3'
        >
            <IssueHeader issueInfo={issueInfo}></IssueHeader>
            <div id='issue-timeline' className='col-span-3'>
                {issueInfo?.comments.map((item: IssueComment) => (
                    <>
                        <TimelineComment {...item}></TimelineComment>
                        <Separator
                            className='ml-2'
                            orientation='vertical'
                            size='2'
                        ></Separator>
                    </>
                ))}
                <Separator size='4' className='mb-3'></Separator>
                <div id='issue-comment-new'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <SimpleMDE
                                    placeholder='Add your comment here...'
                                    {...field}
                                ></SimpleMDE>
                            )}
                        ></Controller>
                        {errors.description && (
                            <ErrorMessage>
                                {errors.description.message}
                            </ErrorMessage>
                        )}
                        <div
                            id='issue-actions-container'
                            className='flex justify-end space-x-1 mt-1'
                        >
                            <Button variant='outline'>Close issue</Button>
                            <Button disabled={isSubmitting}>
                                {isSubmitting && <Spinner></Spinner>}
                                Comment
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div id='issue-sidebar' className='col-span-1 m-2'>
                <IssueSidebar issueId={issueInfo?.id}></IssueSidebar>
            </div>
        </div>
    );
};

export default IssueDetailsPage;
