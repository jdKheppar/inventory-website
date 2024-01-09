import { NextRequest, NextResponse } from "next/server";
//import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
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


// Get all Employees from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);

    try {
        let Employee = createEmployeeModel(phone);
        const allEmployees = await Employee.find({});
        Employee.db.close();
        return NextResponse.json({ allEmployees });
    } catch (error) {
        console.error("Error fetching Employees:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

