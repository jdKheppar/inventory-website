import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { Body, From } = req.body;

        // Handle the Twilio message and reply as needed
        const reply = 'Thank you for your message!'; // Replace with your logic

        const twiml = `
      <Response>
        <Message>${reply}</Message>
      </Response>
    `;

        res.setHeader('Content-Type', 'text/xml');
        res.status(200).end(twiml);
    } else {
        res.status(400).end();
    }
}
