import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";




// Update Employee information
export async function PUT(request: any) {
    await connect(request);
    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    let body = await request.json();
    const { employeeId, updatedEmployee } = body;

    try {
        const result = await Employee.findByIdAndUpdate(employeeId, updatedEmployee);

        if (result) {
            return NextResponse.json({ success: true });
        } else {
            return new NextResponse("Employee not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error updating employee:", error);

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
