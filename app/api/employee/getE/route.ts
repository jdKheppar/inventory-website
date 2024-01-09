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

// Create a new API route for getting employee details by _id
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    try {

        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if (!id) {
            return new NextResponse("Employee ID is required", { status: 400 });
        }
        let Employee = createEmployeeModel(phone);
        // Use the Employee model to find the employee by _id
        const employee = await Employee.findById(id);
        Employee.db.close();
        if (employee) {
            return NextResponse.json({ employee });
        } else {
            return new NextResponse("Employee not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
