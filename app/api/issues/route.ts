import { NextRequest, NextResponse } from 'next/server';

// "@" means the root of the project
import prisma from '@/prisma/client';
import { z } from 'zod';

// used for validating the body of the request
const createIssueSchema = z.object({
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

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description },
    });

    return NextResponse.json(newIssue, { status: 201 });
}
