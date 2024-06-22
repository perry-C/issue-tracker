'use client';

import { Card, Inset } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import { Label } from '@prisma/client';
import LabelMenuBar from '@/components/LabelMenuBar';
import LabelTable from '@/components/LabelTable';
import LabelTopBar from '@/components/LabelTopBar';
import axios from 'axios';

interface Props {}

const LabelsPage = (props: Props) => {
    const [labels, setLabels] = useState<Label[]>([]);

    const fetchLabels = () =>
        axios.get('/api/issues/labels').then((res) => {
            const labelData = res.data;
            setLabels(labelData);
        });
    useEffect(() => {
        fetchLabels();
    }, []);

    return (
        <div>
            <LabelTopBar labels={labels} setLabels={setLabels} />
            <Card className='flex flex-col' variant='classic'>
                <Inset>
                    <LabelTable labels={labels} setLabels={setLabels} />
                </Inset>
            </Card>
        </div>
    );
};

export default LabelsPage;
