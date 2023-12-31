import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/userCon";
import User from "@/models/userModel";

connect();


// Update user information
export async function PUT(request: any) {

    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    let body = await request.json();
    const { userId, updatedUser } = body;

    try {
        const result = await User.findByIdAndUpdate(userId, updatedUser);

        if (result) {
            return NextResponse.json({ success: true });
        } else {
            return new NextResponse("User not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error updating user:", error);

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
