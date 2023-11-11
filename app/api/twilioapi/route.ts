// pages/api/sms.ts
import { NextApiRequest, NextApiResponse } from 'next';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Fetch the message
        const msg = req.body.Body;

        // Create reply
        const twiml = new MessagingResponse();
        twiml.message(`You said: ${msg}`);

        res.setHeader('Content-Type', 'text/xml');
        res.status(200).end(twiml.toString());
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
