import { NextResponse } from "next/server";
import { Collection } from 'mongodb';
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel"; // Import your Product model here

connect();

// Get all the products from the database
export async function GET(request: any) {
    const query = request.nextUrl.searchParams.get("query");
    console.log("The query is: ", query);
    try {

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


        console.log(allProducts);
        return NextResponse.json({ allProducts });
    }

    catch (error) {
        console.error("Error fetching products:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}



