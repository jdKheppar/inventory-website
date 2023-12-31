import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";

// Add a new employee to the database
export async function POST(request: any) {

    let body = await request.json();

    try {
        await connect(request);
        const newEmployee = new Employee(body);

        const savedEmployee = await newEmployee.save();

        return NextResponse.json({ savedEmployee });
    } catch (error) {
        console.error("Error adding a employee:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}



