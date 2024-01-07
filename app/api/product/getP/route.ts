import { NextResponse } from "next/server";
import createProductModel from "@/models/productModel"; // Import your Product model here
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";


// Create a new API route for getting product details by _id
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        let Product=createProductModel(phone);
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if (!id) {
            return new NextResponse("Product ID is required", { status: 400 });
        }

        // Use the Product model to find the product by _id
        const product = await Product.findById(id);
        Product.db.close();
        if (product) {
            return NextResponse.json({ product });
        } else {
            return new NextResponse("Product not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
