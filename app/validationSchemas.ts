import { z } from 'zod';

// used for validating the body of the request
export const createIssueSchema = z.object({
    title: z
        .string({ required_error: 'A title for the issue is required' })
        .min(1)
        .max(255),
    description: z
        .string({
            required_error: 'A description for the issue is required',
            invalid_type_error: 'Description must be a string',
        })
        .min(1, 'Description is required'),
});
