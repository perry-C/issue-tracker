import { NextRequest, NextResponse } from 'next/server';

import { createIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

export async function POST(request: NextRequest) {
    const issue = await request.json();
    const validation = createIssueSchema.safeParse(issue);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const newIssue = await prisma.issue.create({
        data: { title: issue.title, description: issue.description },
    });

    return NextResponse.json(newIssue, { status: 201 });
}

export async function GET() {
    const issues = await prisma.issue.findMany();

    issues.forEach((issue) => {
        const validation = createIssueSchema.safeParse(issue);

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }
    });

    //TODO: parse the body.
    return NextResponse.json(issues, { status: 200 });
}
