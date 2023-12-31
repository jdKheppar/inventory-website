import { NextResponse } from "next/server";
import createEmployeeModel from "@/models/employeeModel";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";



// Get all the employees from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    const query = request.nextUrl.searchParams.get("query");
    console.log("The query is: ", query);
    try {
        let Employee=createEmployeeModel(phone);
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



