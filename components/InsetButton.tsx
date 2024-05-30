import { PropsWithChildren } from 'react';
import React from 'react';

/**
 * This is a custom button component created to handle cases where
 * the Radix-UI button fails to meet personal demand (like embedding into a card component),
 *
 * The component prevents padding inconsistencies, and adheres to
 * the same asthetic as the radix-UI
 *
 */

const InsetButton = (props: PropsWithChildren, ref: any) => {
    return (
        <button
            className='text-iris text-xs
                hover:bg-violet-100
                rounded-sm px-1 flex items-center'
            ref={ref}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default React.forwardRef(InsetButton);
