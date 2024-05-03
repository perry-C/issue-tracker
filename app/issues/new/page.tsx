'use client';

import 'easymde/dist/easymde.min.css';

import { Button, Callout, TextField } from '@radix-ui/themes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Inputs = { title: string; description: string };

const NewIssuePage = () => {
    const router = useRouter();

    const { register, control, handleSubmit } = useForm<Inputs>();
    const [error, setError] = useState<any>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setError(error);
        }
    };

    const ErrorMessages = () => {
        return error.response.data.map((res: any) => {
            return (
                <Callout.Root color='red' role='alert'>
                    <Callout.Icon>
                        <ExclamationTriangleIcon />
                    </Callout.Icon>
                    <Callout.Text>{res.message}</Callout.Text>
                </Callout.Root>
            );
        });
    };
    return (
        <div>
            <form
                className='max-w-xl space-y-3'
                onSubmit={handleSubmit(onSubmit)}
            >
                <ErrorMessages></ErrorMessages>
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
        </div>
    );
};

export default NewIssuePage;
