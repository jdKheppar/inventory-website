import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    try {
        console.log("request is", req);

        const twiml = new MessagingResponse();
        twiml.message(`You said: ${req}`);

        return new NextResponse(twiml.toString(), {
            status: 200,
            headers: { 'Content-Type': 'application/xml' },
        });
    } catch (error) {
        console.error('Error', error);

        return new NextResponse('Internal server error', { status: 500 });
    }
}

