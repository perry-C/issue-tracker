import React, { PropsWithChildren } from 'react';

import { Callout } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorMessage = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Callout.Root color='red' role='alert'>
                <Callout.Icon>
                    <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>{children}</Callout.Text>
            </Callout.Root>
        </div>
    );
};

export default ErrorMessage;
