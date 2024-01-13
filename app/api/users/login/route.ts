import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        //check if user exists
        const user = await User.findOne({ email });

        console.log("user", user);
        if (!user) {
            console.log("user don't exists");
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
            console.log("invalid password");
            return NextResponse.json({ error: "invalidPassword" }, { status: 404 })
        }
        console.log(user);

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            phone: user.phone,
            email: user.email
        }
        //create token
        let token;
        try {
            token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "Error in jwt" }, { status: 500 });
        }


        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,

        })
        User.db.close();
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}