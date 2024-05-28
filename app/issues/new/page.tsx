'use client';

import 'easymde/dist/easymde.min.css';

import { Button, TextField } from '@radix-ui/themes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import ErrorMessage from '@/components/ErrorMessage';
import SimpleMDE from 'react-simplemde-editor';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { createIssueSchema } from '@/app/validationSchemas';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
    const onSubmit: SubmitHandler<IssueForm> = async (data) => {
        try {
            setIsSubmitting(true);
            axios.post('/api/issues', data).then(
                (res) => {
                    axios.post(`/api/issues/${res.data.id}`, {
                        description: res.data.description,
                    });
                },
                (rej) => {
                    console.error(rej);
                }
            );

            router.push('/issues');
        } catch (error) {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form
                className='max-w-xl space-y-3'
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField.Root
                    placeholder='Add new issue'
                    {...register('title')}
                ></TextField.Root>

                {errors.title && (
                    <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE
                            placeholder='Add issue description'
                            {...field}
                        ></SimpleMDE>
                    )}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
                <Button disabled={isSubmitting}>
                    Submit New Issue
                    {isSubmitting && <Spinner></Spinner>}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
