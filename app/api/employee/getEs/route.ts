import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";



// Get all Employees from the database
export async function GET(request: any) {
    await connect(request);
    try {
        const allEmployees = await Employee.find({});

        return NextResponse.json({ allEmployees });
    } catch (error) {
        console.error("Error fetching Employees:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

