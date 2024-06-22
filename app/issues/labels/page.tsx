'use client';

import { Card, Inset } from '@radix-ui/themes';

import LabelMenuBar from '@/components/LabelMenuBar';
import LabelTable from '@/components/LabelTable';
import LabelTopBar from '@/components/LabelTopBar';

interface Props {}

const LabelsPage = (props: Props) => {
    return (
        <div>
            <LabelTopBar />
            <Card className='flex flex-col' variant='classic'>
                <Inset>
                    <LabelTable />
                </Inset>
            </Card>
        </div>
    );
};

export default LabelsPage;
