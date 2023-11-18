import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: any) {
  try {
    const message = await req.body;
    console.log("request is: ", req);
    console.log("message(req.body) is", message);

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
