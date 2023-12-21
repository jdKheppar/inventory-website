import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";

connect();


// Delete a supplier from the database
export async function DELETE(request: any) {
    try {
        const body = await request.json();
        const { employeeId } = body;

        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (deletedEmployee) {
            return NextResponse.json({ message: "Employee deleted successfully" });
        } else {
            return new NextResponse("Employee not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting Employee:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

