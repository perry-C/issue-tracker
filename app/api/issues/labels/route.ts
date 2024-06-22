import { NextRequest, NextResponse } from 'next/server';

import { createLabelSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

export const GET = async (request: NextRequest) => {
    const allLabels = await prisma.label.findMany();

    allLabels.forEach((label) => {
        const validation = createLabelSchema.safeParse(label);
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }
    });

    return NextResponse.json(allLabels, { status: 200 });
};

export const POST = async (request: NextRequest) => {
    const labelToAdd = await request.json();
    console.log(labelToAdd);

    const validation = createLabelSchema.safeParse(labelToAdd);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newLabel = await prisma.label.create({
        data: {
            name: labelToAdd.name,
            description: labelToAdd.description,
            color: labelToAdd.color,
        },
    });

    if (!newLabel) {
        return NextResponse.json(
            'Label can not be added for some reason, check format',
            {
                status: 400,
            }
        );
    }

    return NextResponse.json(newLabel, { status: 200 });
};

export const PATCH = async (request: NextRequest) => {
    // TODO: in order to establish the LabelOnIssues relationship
    // We need to get 1. id on the label 2. id on the issue
    //
    //
    // (Choices on the endpoint URI:
    // should take advantage of the dynamic route segment
    // hence should be ideally PATCH request to the api/issues/labels/{labelId} URI
    // and be updating the
    //
    // )
};
