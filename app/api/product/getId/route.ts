import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel"; // Import your Product model here


// Create a new API route for getting product details by name
export async function GET(request: any) {
    connect(request);
    try {
        const url = new URL(request.url);
        const productName = url.searchParams.get("name"); // Retrieve product name from query parameter

        if (!productName) {
            return new NextResponse("Product name is required", { status: 400 });
        }

        // Use the Product model to find the product by name
        const product = await Product.findOne({ name: productName });

        if (product) {
            return NextResponse.json({ _id: product._id }); // Return the _id corresponding to the product name
        } else {
            return new NextResponse("Product not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
