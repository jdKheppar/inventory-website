// pages/api/sms.ts
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest } from 'next';

export async function POST(request: NextApiRequest) {
    try {
        // Fetch the message from the request body
        const { Body } = await request.body;
        // Create reply
        const twiml = new MessagingResponse();
        twiml.message(`You said: ${Body}`);
        return new NextResponse(twiml.toString(), {
            status: 200,
            headers: { 'Content-Type': 'application/xml' }, // TwiML should be served as XML
        });
    } catch (error) {
        console.error('Error', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}





