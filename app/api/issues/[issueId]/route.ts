import { NextRequest, NextResponse } from 'next/server';

import { createIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

export async function GET(
    request: NextRequest,
    { params }: { params: { issueId: number } }
) {
    const issueRequested = await prisma.issue.findUnique({
        where: { id: Number(params.issueId) },
    });
    const validation = createIssueSchema.safeParse(issueRequested);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 422 });
    }
    return NextResponse.json(issueRequested, { status: 200 });
}
