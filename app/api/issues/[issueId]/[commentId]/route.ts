import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/client';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { commentId: string } }
) {
    try {
        const deleteComment = await prisma.issueComment.delete({
            where: { id: Number(params.commentId) },
        });
        return NextResponse.json(deleteComment, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 401 });
    }
}
