import { NextResponse } from "next/server";
import createSupplierModel from "@/models/supplierModel";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";



// Get all the suppliers from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    const query = request.nextUrl.searchParams.get("query");
    console.log("The query is: ", query);
    try {
        let Supplier=createSupplierModel(phone);
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


        //console.log(allSuppliers);
        Supplier.db.close();
        return NextResponse.json({ allSuppliers });
    }

    catch (error) {
        console.error("Error fetching suppliers in search:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}



