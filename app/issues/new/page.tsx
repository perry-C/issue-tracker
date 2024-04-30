'use client';

import React from 'react';
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

<SimpleMDE />;
const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root placeholder='Add new issue'></TextField.Root>
            <SimpleMDE placeholder='Add issue description'></SimpleMDE>
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;