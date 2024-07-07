import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/client';

// Returns a list of labels ASSIGNED TO THIS ISSUE
export const GET = async (
    request: NextRequest,
    { params }: { params: { issueId: string } }
) => {
    // labels =
    return NextResponse.json(`success with ${params.issueId}`, { status: 200 });
};

export const POST = async (
    request: NextRequest,
    { params }: { params: { issueId: string } }
) => {
    // Get a list of label IDs from the client
    // which the user wishes to assign to the issue
    const { labelIds }: { labelIds: string[] } = await request.json();

    // Initialise data to be added in accordance to
    // the prisma format
    const labelsToAdd = labelIds.map((labelId) => ({
        issueId: Number(params.issueId),
        labelId: Number(labelId),
    }));

    // Send data to the back-end through prisma ORM
    const labelsAdded = prisma.labelsOnIssues.createMany({
        data: labelsToAdd,
        skipDuplicates: true,
    });

    return NextResponse.json(labelsAdded, { status: 200 });
};
