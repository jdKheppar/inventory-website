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

export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        const url = new URL(request.url);
        const employeeName = url.searchParams.get("name");

        if (!employeeName) {
            return new NextResponse("Employee name is required", { status: 400 });
        }
        let Employee = createEmployeeModel(phone);

        // Use the employee model to find the employee by name
        const employee = await Employee.findOne({ name: employeeName });
        Employee.db.close();
        if (employee) {
            return NextResponse.json({ _id: employee._id }); // Return the _id corresponding to the employee name
        } else {
            return new NextResponse("Employee not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
