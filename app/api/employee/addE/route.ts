import { NextRequest, NextResponse } from "next/server";
import createEmployeeModel from "@/models/employeeModel";
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
// Add a new employee to the database
export async function POST(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        let body = await request.json();
        let Employee = createEmployeeModel(phone);
        const newEmployee = new Employee(body);

        const savedEmployee = await newEmployee.save();
        Employee.db.close();
        return NextResponse.json({ savedEmployee });
    } catch (error) {
        console.error("Error adding a employee:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}



