import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type');

        if (contentType === 'application/json') {
            const { Body } = await request.json();

            // Create reply for JSON request
            const twiml = new MessagingResponse();
            twiml.message(`You said (JSON): ${Body}`);

            return new NextResponse(twiml.toString(), {
                status: 200,
                headers: { 'Content-Type': 'application/xml' }, // TwiML should be served as XML
            });

        } else if (contentType === 'application/xml') {
            const body = await request.text();

            // Create reply for XML request
            const twiml = new MessagingResponse();
            twiml.message(`You said (XML): ${body}`);

            return new NextResponse(twiml.toString(), {
                status: 200,
                headers: { 'Content-Type': 'application/xml' }, // TwiML should be served as XML
            });

        } else {
            return new NextResponse('Unsupported content type', { status: 415 });
        }

    } catch (error) {
        console.error('Error', error);

        return new NextResponse('Internal server error', { status: 500 });
    }
}
