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

export const createIssueCommentSchema = z.object({
    description: z
        .string({
            required_error: 'The comment can not be empty',
            invalid_type_error: 'Description must be a string',
        })
        .min(1, 'The comment can not be empty'),
});

export const createLabelSchema = z.object({
    name: z
        .string({ required_error: 'The label name can not be empty' })
        .min(1, 'The label can not be empty')
        .max(50, 'The name of the label can not exceed 50 characters'),
    description: z
        .string({ required_error: 'The label description can not be empty' })
        .min(1, 'The description can not be empty'),
    color: z
        .string({ required_error: 'The color code can not be empty' })
        .length(7, 'The color code must be exactly 7 characters long'),
});
