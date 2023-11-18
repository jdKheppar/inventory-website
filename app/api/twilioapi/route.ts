import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

export async function POST(req: any, res: any) {

    try {
        const message = req.body;
        console.log(`Received message from ${message.From}: ${message.Body}`);

        const twiml = new MessagingResponse();
        twiml.message(`You said: ${message.Body}`);

        res.setHeader('Content-Type', 'text/xml');
        res.status(200).send(twiml.toString());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

