import { NextResponse } from "next/server";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import getEmployeeModel from "@/models/employeeModel";



// Get all Employees from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    
    try {
        let Employee=getEmployeeModel(phone);
        const allEmployees = await Employee.find({});
        Employee.db.close();
        return NextResponse.json({ allEmployees });
    } catch (error) {
        console.error("Error fetching Employees:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

