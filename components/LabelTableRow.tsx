import { Button } from '@radix-ui/themes';

interface LabelTableRowProps {
    id: number;
    name: string;
    description: string;
}

const LabelTableRow = (props: LabelTableRowProps) => {
    return (
        <div
            id={`label-row-${props.id}`}
            className='grid grid-cols-4 items-center p-2 space-x-2 hover:bg-zinc-100 transition-colors'
        >
            {/* TODO: color-code to differentiate labels  */}
            <div id='label-row-name'>{props.name}</div>
            <div id='label-row-description' className='text-zinc-500 text-xs'>
                {props.description}
            </div>
            <div id='label-row-counter'></div>
            <div id='label-row-actions' className='flex justify-end space-x-1'>
                <Button variant='outline'>Edit</Button>
                <Button variant='outline'>
                    <div className='text-red-600'>Delete</div>
                </Button>
            </div>
        </div>
    );
};

export default LabelTableRow;
