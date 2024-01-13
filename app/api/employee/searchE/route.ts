import { NextResponse } from "next/server";
import createEmployeeModel from "@/models/employeeModel";


// Get all the employees from the database
export async function GET(request: any) {
    const query = request.nextUrl.searchParams.get("query");
    console.log("The query is: ", query);
    try {
        const phone = request.query.phone;
        let Employee = createEmployeeModel(phone);
        const allEmployees = await Employee.aggregate([
            {
                $match: {
                    $or: [
                        {
                            name: {
                                $regex: query,
                                $options: "i",
                            },
                        },
                        {
                            category: {
                                $regex: query,
                                $options: "i",
                            },
                        },
                    ],
                },
            },
        ]);

        Employee.db.close();
        //console.log(allEmployees);
        return NextResponse.json({ allEmployees });
    }

    catch (error) {
        console.error("Error fetching employees in search:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}



