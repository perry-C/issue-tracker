import { NextRequest, NextResponse } from 'next/server';

import { createIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

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

export async function GET() {
    const body = await prisma.issue.findMany();

    body.forEach((obj) => {
        const validation = createIssueSchema.safeParse(obj);

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 422 });
        }
    });

    //TODO: parse the body.
    return NextResponse.json(body, { status: 200 });
}
