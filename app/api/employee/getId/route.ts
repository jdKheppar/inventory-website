import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";

connect();

export async function GET(request: any) {
    try {
        const url = new URL(request.url);
        const employeeName = url.searchParams.get("name");

        if (!employeeName) {
            return new NextResponse("Employee name is required", { status: 400 });
        }

        // Use the employee model to find the employee by name
        const employee = await Employee.findOne({ name: employeeName });

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
