import { Issue, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {
    createIssueCommentSchema,
    createIssueSchema,
} from '@/app/validationSchemas';

import { headers } from 'next/headers';
import prisma from '@/prisma/client';

export async function GET(
    request: NextRequest,
    { params }: { params: { issueId: number } }
) {
    const issueRequested = await prisma.issue.findUnique({
        where: { id: Number(params.issueId) },
        include: {
            comments: true,
        },
    });
    const validation = createIssueSchema.safeParse(issueRequested);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 422 });
    }
    return NextResponse.json(issueRequested, { status: 200 });
}

// Add the newly created comment to the server

export async function POST(
    request: NextRequest,
    { params }: { params: { issueId: number } }
) {
    const comment = await request.json();

    const validation = createIssueCommentSchema.safeParse(comment);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // Creation of the new comment onto the server
    const newComment = await prisma.issueComment.create({
        data: {
            description: comment.description,
            issueId: Number(params.issueId),
        },
    });

    // Linking it to its related issue
    const updatedIssue = await prisma.issue.update({
        where: {
            id: Number(params.issueId),
        },
        data: {
            comments: {
                connect: {
                    id: newComment.id,
                },
            },
        },
    });
    return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { issueId: number } }
) {
    //TODO: identify if the data requested to delete conforms to the standard
    const deletePost = await prisma.issue.delete({
        where: { id: Number(params.issueId) },
    });

    if (!deletePost) {
        return NextResponse.error();
    }
    return NextResponse.json(deletePost, { status: 200 });
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { issueId: number } }
) {
    const headersList = headers();
    const fieldToUpdate = headersList.get('fieldToUpdate');
    if (fieldToUpdate) {
        const { newField } = await request.json();

        const updatedIssue = await prisma.issue.update({
            where: { id: Number(params.issueId) },
            data: { [fieldToUpdate]: newField },
        });

        return NextResponse.json(updatedIssue, { status: 200 });
    } else {
        return NextResponse.json(
            { error: 'A update field must be declared for the PATCH request' },
            { status: 400 }
        );
    }
}
