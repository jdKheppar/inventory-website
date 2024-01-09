import { NextRequest, NextResponse } from "next/server";
import createProductModel from "@/models/productModel"; // Import your Product model here
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


// Get all the products from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    const query = request.nextUrl.searchParams.get("query");
    console.log("The query is: ", query);
    try {
        let Product = createProductModel(phone);

        const allProducts = await Product.aggregate([
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

        Product.db.close();
        //console.log(allProducts);
        return NextResponse.json({ allProducts });
    }

    catch (error) {
        console.error("Error fetching products:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}



