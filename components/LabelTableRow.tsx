import { Button } from '@radix-ui/themes';
import { Label } from '@prisma/client';
import axios from 'axios';

interface LabelTableRowProps {
    id: number;
    name: string;
    description: string;
    labels: Label[];
    setLabels: any;
}

const LabelTableRow = ({
    id,
    name,
    description,
    labels,
    setLabels,
}: LabelTableRowProps) => {
    const handleLabelDelete = () => {
        const body = { data: { id: id } };
        axios.delete('/api/issues/labels', body).then(() => {
            setLabels(labels.filter((label) => label.id !== id));
        });
    };
    return (
        <div
            id={`label-row-${id}`}
            className='grid grid-cols-4 items-center p-2 space-x-2 hover:bg-zinc-100 transition-colors'
        >
            {/* TODO: color-code to differentiate labels  */}
            <div id='label-row-name'>{name}</div>
            <div id='label-row-description' className='text-zinc-500 text-xs'>
                {description}
            </div>
            <div id='label-row-counter'></div>
            <div id='label-row-actions' className='flex justify-end space-x-1'>
                <Button variant='outline'>Edit</Button>
                <Button variant='outline' onClick={handleLabelDelete}>
                    <div className='text-red-600'>Delete</div>
                </Button>
            </div>
        </div>
    );
};

export default LabelTableRow;
