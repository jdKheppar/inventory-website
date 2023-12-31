import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Supplier from "@/models/supplierModel";



// Get all the suppliers from the database
export async function GET(request: any) {
    connect(request);
    const query = request.nextUrl.searchParams.get("query");
    console.log("The query is: ", query);
    try {

        const allSuppliers = await Supplier.aggregate([
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


        console.log(allSuppliers);
        return NextResponse.json({ allSuppliers });
    }

    catch (error) {
        console.error("Error fetching suppliers in search:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}



