import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/userCon";
import User from "@/models/userModel";

connect()



export async function GET(request: any) {
    try {
        const url = new URL(request.url);
        const emailAddress = url.searchParams.get("email");

        if (!emailAddress) {
            return new NextResponse("Email address is required", { status: 400 });
        }

        // Use the User model to find the user by name
        const user = await User.findOne({ email: emailAddress });

        if (user) {
            return NextResponse.json({ _id: user._id }); // Return the _id corresponding to the eamil
        } else {
            return new NextResponse("User not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
