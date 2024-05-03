'use client';

import 'easymde/dist/easymde.min.css';

import { Button, TextField } from '@radix-ui/themes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import ErrorMessage from '@/app/ErrorMessage';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import { createIssueSchema } from '@/app/validationSchemas';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type IssueForm = z.infer<typeof createIssueSchema>;
// type Inputs = { title: string; description: string };

const NewIssuePage = () => {
    const router = useRouter();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
    const onSubmit: SubmitHandler<IssueForm> = async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
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
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
