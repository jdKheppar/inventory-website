import { NextResponse } from "next/server";
import createEmployeeModel from "@/models/employeeModel";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";

// Add a new employee to the database
export async function POST(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        let body = await request.json();
        let Employee=createEmployeeModel(phone);
        const newEmployee = new Employee(body);

        const savedEmployee = await newEmployee.save();
        Employee.db.close();
        return NextResponse.json({ savedEmployee });
    } catch (error) {
        console.error("Error adding a employee:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}



