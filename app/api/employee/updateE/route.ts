import { NextResponse } from "next/server";
import createEmployeeModel from "@/models/employeeModel";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";




// Update Employee information
export async function PUT(request: any) {
    let phone = await getPhoneFromToken(request);
    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    let body = await request.json();
    const { employeeId, updatedEmployee } = body;

    try {
        let Employee=createEmployeeModel(phone);
        const result = await Employee.findByIdAndUpdate(employeeId, updatedEmployee);
        Employee.db.close();
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
