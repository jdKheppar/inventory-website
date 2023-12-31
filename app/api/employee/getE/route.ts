import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel"; // Import your Product model here


// Create a new API route for getting employee details by _id
export async function GET(request: any) {
    await connect(request);
    try {

        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if (!id) {
            return new NextResponse("Employee ID is required", { status: 400 });
        }

        // Use the Employee model to find the employee by _id
        const employee = await Employee.findById(id);

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
