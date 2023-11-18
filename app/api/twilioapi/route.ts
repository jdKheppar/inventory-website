import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const message = await req.body;
    console.log("message is", message);

    const twiml = new MessagingResponse();
    twiml.message(`You said: ${message}`);

    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}
