import { Button, Card, IconButton, Strong, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon, UpdateIcon } from '@radix-ui/react-icons';
import { PropsWithChildren, useRef, useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';
import { Label } from '@prisma/client';
import axios from 'axios';
import { createLabelSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
    labels: Label[];
    setLabels: any;
}

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

type LabelSubmissionField = (typeof labelSubmissionFieldsInfo)[0];

type LabelForm = z.infer<typeof createLabelSchema>;

interface labelSubmissionFields {
    descriptor: string;
    name: keyof LabelForm;
    placeHolder: string;
}

const labelSubmissionFieldsInfo: labelSubmissionFields[] = [
    {
        descriptor: 'Label Name',
        name: 'name',
        placeHolder: 'Label Name',
    },
    {
        descriptor: 'Description',
        name: 'description',
        placeHolder: 'Description',
    },
    {
        descriptor: 'Color',
        name: 'color',
        placeHolder: '#000000',
    },
];

const LabelTopBar = ({ labels, setLabels }: Props) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LabelForm>({
        mode: 'onSubmit',
        resolver: zodResolver(createLabelSchema),
    });

    const [isCreatingNewLabel, setIsCreatingNewLabel] = useState(false);

    const [DatabaseError, setSubmitError] = useState('');

    const submitErrors = () =>
        Object.values(errors).map((error) => {
            return (
                <li>
                    <ErrorMessage>{error?.message}</ErrorMessage>
                </li>
            );
        });

    const handleNewLabelClick = () => {
        setIsCreatingNewLabel(!isCreatingNewLabel);
    };

    const handleGenerateRandomColor = () => {
        setValue('color', getRandomColor());
    };

    const handleCancelCreate = () => {
        setIsCreatingNewLabel(false);
    };

    const onSubmit: SubmitHandler<LabelForm> = async (data: LabelForm) => {
        axios
            .post('/api/issues/labels', data)
            .then((res) => {
                setLabels([...labels, res.data]);
            })
            .catch((err) => {
                setSubmitError(err.message);
            });
    };

    const labelSubmissionFields = labelSubmissionFieldsInfo.map(
        (item: LabelSubmissionField, key) => (
            <li className='flex flex-col space-y-1' key={key}>
                <Strong className=''>{item.descriptor}</Strong>
                {item.descriptor === 'Color' ? (
                    <div className='flex space-x-1 items-center'>
                        <IconButton
                            onClick={handleGenerateRandomColor}
                            type='button'
                        >
                            <UpdateIcon />
                        </IconButton>
                        <TextField.Root
                            size='2'
                            className='w-32'
                            placeholder={item.placeHolder}
                            {...register(item.name)}
                            defaultValue={getRandomColor()}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                    </div>
                ) : (
                    <TextField.Root
                        placeholder={item.placeHolder}
                        className='w-48'
                        {...register(item.name)}
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                )}
            </li>
        )
    );

    return (
        <div id='label-top-bar' className='flex flex-col'>
            <div
                id='without-create-new-label'
                className='flex flex-wrap justify-between mb-5'
            >
                <TextField.Root
                    className='w-2/3'
                    size='2'
                    placeholder='Search all labels'
                    variant='classic'
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height='16' width='16' />
                    </TextField.Slot>
                </TextField.Root>
                <Button className='text-iris' onClick={handleNewLabelClick}>
                    New Label
                </Button>
            </div>
            {isCreatingNewLabel && (
                <Card id='with-create-new-label' className='mb-4'>
                    <form
                        id='label-submission-form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <ul className='flex flex-wrap justify-between'>
                            {labelSubmissionFields}
                            <div className='flex self-end space-x-1'>
                                <Button
                                    variant='outline'
                                    onClick={handleCancelCreate}
                                >
                                    Cancel
                                </Button>
                                <Button type='submit'>Create Label</Button>
                            </div>
                        </ul>
                        {errors && (
                            <ul className='mt-2 space-y-2'>{submitErrors()}</ul>
                        )}
                    </form>

                    {DatabaseError && (
                        <ErrorMessage className='mt-2'>
                            The label name already exists
                        </ErrorMessage>
                    )}
                </Card>
            )}
        </div>
    );
};

export default LabelTopBar;
