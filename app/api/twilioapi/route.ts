// pages/api/sms.ts
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
    try {
        // Fetch the message from the request body
        const { Body } = await request.json();

        // Create reply
        console.log("The message received is", Body);
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





