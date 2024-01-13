import { NextResponse } from "next/server";
import createEmployeeModel from "@/models/employeeModel";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";


// Delete a supplier from the database
export async function DELETE(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        const body = await request.json();
        const { employeeId } = body;
        let Employee = createEmployeeModel(phone);

        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        Employee.db.close();
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

