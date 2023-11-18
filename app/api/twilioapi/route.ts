import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: any) {
  try {
    const message = await req.json();
    console.log("message(req.json) is:", message);
    console.log("message.parameters is:", message.parameters);
    console.log("message.body is:", message.Body);
    const twiml = new MessagingResponse();
    twiml.message(`You said: ${message.Body}`);

    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}


