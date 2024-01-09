import { NextRequest, NextResponse } from "next/server";
import createEmployeeModel from "@/models/employeeModel";
//import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import jwt from "jsonwebtoken";

const getPhoneFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.phone;
    } catch (error: any) {
        throw new Error(error.message);
    }

}



// Update Employee information
export async function PUT(request: any) {
    let phone = await getPhoneFromToken(request);
    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    let body = await request.json();
    const { employeeId, updatedEmployee } = body;

    try {
        let Employee = createEmployeeModel(phone);
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
