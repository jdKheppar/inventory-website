import { connect } from "@/dbConfig/userCon";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody

        //check if user already exists
        const user = await User.findOne({ email })

        console.log("user returned by mongodb", user);
        if (user) {
            //send verification email
            console.log("user", user);
            let sendResponse = await sendEmail({ email, emailType: "RESET", userId: user._id })
            console.log("sendEmail response", sendResponse);
            return NextResponse.json({
                message: "Email sent",
                success: true,
                user
            })
        }
        else {
            console.log("user don't exists");
            return NextResponse.json({ message: "Invalid email" });
        }



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}