'use client';

import 'easymde/dist/easymde.min.css';

import { Button, Separator } from '@radix-ui/themes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Issue, IssueComment } from '@prisma/client';
import { useEffect, useState } from 'react';

import ErrorMessage from '@/components/ErrorMessage';
import IssueHeader from '@/components/IssueHeader';
import IssueSidebar from '@/components/IssueSideBar';
import { SecondarySpinner } from '@/components/Spinner';
import SimpleMDE from 'react-simplemde-editor';
import TimelineComment from '@/components/TimelineComment';
import axios from 'axios';
import { createIssueCommentSchema } from '@/app/validationSchemas';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type IssueCommentInput = z.infer<typeof createIssueCommentSchema>;

const IssueDetailsPage = ({ params }: { params: { issueId: string } }) => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueCommentInput>({
        resolver: zodResolver(createIssueCommentSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [issue, setIssue] = useState<Issue>();
    const [issueTitle, setIssueTitle] = useState('');

    const [comments, setComments] = useState<IssueComment[]>([]);

    const fetchIssues = () =>
        axios.get(`/api/issues/${params.issueId}`).then((resolve) => {
            const response = JSON.parse(resolve.request.response);
            const { comments, ...issueObject } = response;
            setComments(comments);
            setIssue(issueObject);
            setIssueTitle(issueObject.title);
        });

    const handleDeleteIssue = async () => {
        try {
            await axios.delete(`/api/issues/${params.issueId}`);
            router.push('/issues');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const onSubmit: SubmitHandler<IssueCommentInput> = async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post(`/api/issues/${params.issueId}`, data);
            fetchIssues();
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
            <IssueHeader
                issueInfo={issue}
                issueTitle={issueTitle}
                setIssueTitle={setIssueTitle}
            ></IssueHeader>
            <div id='issue-timeline' className='col-span-3'>
                {comments?.map((comment: IssueComment) => (
                    <div key={comment.id}>
                        <TimelineComment
                            comments={comments}
                            setComments={setComments}
                            {...comment}
                        ></TimelineComment>
                        <Separator
                            className='ml-2'
                            orientation='vertical'
                            size='2'
                        />
                    </div>
                ))}
                <Separator size='4' className='mb-3' />
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
                            <Button
                                variant='outline'
                                type='button'
                                onClick={handleDeleteIssue}
                            >
                                Close issue
                            </Button>
                            <Button disabled={isSubmitting} type='submit'>
                                {isSubmitting && (
                                    <SecondarySpinner></SecondarySpinner>
                                )}
                                Comment
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div id='issue-sidebar' className='col-span-1 m-2'>
                <IssueSidebar
                    issueId={issue?.id}
                    handleDeleteIssue={handleDeleteIssue}
                ></IssueSidebar>
            </div>
        </div>
    );
};

export default IssueDetailsPage;
