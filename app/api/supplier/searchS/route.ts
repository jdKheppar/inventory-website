import { NextRequest, NextResponse } from "next/server";
import createSupplierModel from "@/models/supplierModel";
//import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import jwt from "jsonwebtoken";

const getPhoneFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.phone;
    } catch (error: any) {
        throw new Error(error.message);
    }

}


// Get all the suppliers from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    const query = request.nextUrl.searchParams.get("query");
    console.log("The query is: ", query);
    try {
        let Supplier = createSupplierModel(phone);
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



