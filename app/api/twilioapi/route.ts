// pages/api/sms.ts
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { NextResponse } from 'next/server';


export async function POST(request: any) {
    try {
        // Fetch the message from the request body
        const { Body } = await request.body;
        const contentType = request.headers['content-type'];
        // Create reply
        const twiml = new MessagingResponse();
        twiml.message(`You said: ${contentType}`);

        return new NextResponse(twiml.toString(), {
            status: 200,
            headers: { 'Content-Type': 'application/xml' }, // TwiML should be served as XML
        });
    } catch (error) {
        console.error('Error', error);

        return new NextResponse('Internal server error', { status: 500 });
    }
}





