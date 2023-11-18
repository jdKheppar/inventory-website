import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: any) {

    try {
        const message = req.Parameters;
        console.log("req is: ", req);
        console.log("req.Body is: ", req.Body);
        console.log("req.Parameters is: ", message);
        const twiml = new MessagingResponse();
        twiml.message(`You said: ${req.Parameters.Body}`);

        return new NextResponse(twiml.toString(), {
            status: 200,
            headers: { 'Content-Type': 'application/xml' },
        });
    } catch (error) {
        console.error('Error', error);

        return new NextResponse('Internal server error', { status: 500 });
    }
}

