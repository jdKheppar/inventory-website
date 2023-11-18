import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    try {
        const Body = await req.body;
        console.log(Body);
        const twiml = new MessagingResponse();
        twiml.message(`You said: ${Body}`);

        return new NextResponse(twiml.toString(), {
            status: 200,
            headers: { 'Content-Type': 'application/xml' },
        });
    } catch (error) {
        console.error('Error', error);

        return new NextResponse('Internal server error', { status: 500 });
    }
}



