import React, { PropsWithChildren } from 'react';

import { Callout } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface Props {
    className?: string;
    children?: any;
}
const ErrorMessage = (props: Props) => {
    return (
        <div className={props.className}>
            <Callout.Root color='red' role='alert'>
                <Callout.Icon>
                    <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>{props.children}</Callout.Text>
            </Callout.Root>
        </div>
    );
};

export default ErrorMessage;
