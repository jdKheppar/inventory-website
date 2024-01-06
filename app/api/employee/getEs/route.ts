import { NextResponse } from "next/server";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import { connect } from "@/dbConfig/userCon";
import Employee from "@/models/employeeModel";



// Get all Employees from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    await connect(phone);
    try {
        const allEmployees = await Employee.find({});

        return NextResponse.json({ allEmployees });
    } catch (error) {
        console.error("Error fetching Employees:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

