import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";

connect();

// Get all employees from the database
export async function GET(request: any) {
    try {
        const allEmployees = await Employee.find({});

        return NextResponse.json({ allEmployees });
    } catch (error) {
        console.error("Error fetching employees:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

// Add a new employee to the database
export async function POST(request: any) {
    let body = await request.json();

    try {
        const newEmployee = new Employee(body);

        const savedEmployee = await newEmployee.save();

        return NextResponse.json({ savedEmployee });
    } catch (error) {
        console.error("Error adding an employee:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

// Delete an employee from the database
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
        console.error("Error deleting an employee:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

// Update employee information
export async function PUT(request: any) {
    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    let body = await request.json();
    const { employeeId, updatedEmployee } = body;

    try {
        const result = await Employee.findByIdAndUpdate(employeeId, updatedEmployee);

        if (result) {
            return NextResponse.json({ success: true });
        } else {
            return new NextResponse("Employee not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error updating an employee:", error);

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
