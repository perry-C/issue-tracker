import { Button, Card, IconButton, Strong, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon, UpdateIcon } from '@radix-ui/react-icons';
import { PropsWithChildren, useRef, useState } from 'react';

import { Label } from '@prisma/client';
import axios from 'axios';

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

const LabelTopBar = ({ labels, setLabels }: Props) => {
    const labelSubmissionFieldsInfo = [
        {
            name: 'Label Name',
            // Which attribute on the table to change
            attribute: 'name',
            placeHolder: 'Label Name',
            action: '',
        },
        {
            name: 'Description',
            attribute: 'description',
            placeHolder: 'Description',
            action: '',
        },
        {
            name: 'Color',
            attribute: 'color',
            placeHolder: '#000000',
            action: '',
        },
    ];

    const [isCreatingNewLabel, setIsCreatingNewLabel] = useState(false);
    const colorInputFieldRef = useRef<any>(null);
    const handleNewLabelClick = () => {
        setIsCreatingNewLabel(!isCreatingNewLabel);
    };

    const handleGenerateRandomColor = () => {
        colorInputFieldRef.current.value = getRandomColor();
    };

    const handleCancelCreate = () => {
        setIsCreatingNewLabel(false);
    };

    const handleCreateLabel = () => {
        alert('function handleCreateLabel not implemented');
    };

    const handleFormSubmission = (formData: FormData) => {
        const formObject = Object.fromEntries(formData.entries());
        axios
            .post('/api/issues/labels', formObject)
            .then((res) => {
                setLabels([...labels, res.data]);
            })
            .catch((err) => console.log(err));
    };

    const TextFieldColor = ({
        attribute,
        children,
    }: {
        attribute: string;
        children: string;
    }) => (
        <div className='flex space-x-1 items-center'>
            <IconButton onClick={handleGenerateRandomColor} type='button'>
                <UpdateIcon />
            </IconButton>
            <TextField.Root
                size='2'
                className='w-32'
                name={attribute}
                placeholder={children}
                ref={colorInputFieldRef}
                defaultValue={getRandomColor()}
            >
                <TextField.Slot></TextField.Slot>
            </TextField.Root>
        </div>
    );
    const TextFieldOther = ({
        attribute,
        children,
    }: {
        attribute: string;
        children: string;
    }) => (
        <TextField.Root
            name={attribute}
            placeholder={children}
            className='w-48'
        >
            <TextField.Slot></TextField.Slot>
        </TextField.Root>
    );

    const labelSubmissionFields = labelSubmissionFieldsInfo.map((item, key) => (
        <li className='flex flex-col space-y-1' key={key}>
            <Strong className=''>{item.name}</Strong>
            {item.name === 'Color' ? (
                <TextFieldColor attribute={item.attribute}>
                    {item.placeHolder}
                </TextFieldColor>
            ) : (
                <TextFieldOther attribute={item.attribute}>
                    {item.placeHolder}
                </TextFieldOther>
            )}
        </li>
    ));

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
                        action={handleFormSubmission}
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
                    </form>
                </Card>
            )}
        </div>
    );
};

export default LabelTopBar;
