'use client';

import 'easymde/dist/easymde.min.css';

import { Button, TextField } from '@radix-ui/themes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Inputs = { title: string; description: string };

const NewIssuePage = () => {
    const router = useRouter();

    const { register, control, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios.post('/api/issues', data);
        router.push('/issues');
    };
    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root
                placeholder='Add new issue'
                {...register('title')}
            ></TextField.Root>
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
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
