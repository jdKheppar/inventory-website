import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const twiml = new twilio.twiml.MessagingResponse();

    // Check if the request is a Twilio message
    if (req.body && req.body.From) {
        const messageBody = req.body.Body;
        const fromNumber = req.body.From;

        // Handle the incoming message
        console.log(`Received message from ${fromNumber}: ${messageBody}`);

        // Your logic for processing the incoming message and forming a reply
        const reply = "Thank you for your message!";

        // Send a reply
        twiml.message(reply);

        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
    } else {
        res.status(400).end();
    }
}
