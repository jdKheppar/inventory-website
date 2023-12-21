import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "noUser" }, { status: 404 })
        }
        console.log("user exists");
        if (!user.isVerfied) {
            return NextResponse.json({ error: "notVerified" }, { status: 403 })
        }
        console.log("user verified")


        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "invalidPassword" }, { status: 404 })
        }
        console.log(user);

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        let token;
        try {
            token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
        } catch (error) {
            return NextResponse.json({ error: "Error in jwt" }, { status: 500 });
        }


        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,

        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}