import { NextResponse } from "next/server";
import createProductModel from "@/models/productModel"; // Import your Product model here
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";


// Update a product information
export async function PUT(request: any) {
    let phone = await getPhoneFromToken(request);
    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    let body = await request.json();
    const { productId, updatedProduct } = body;

    try {
        let Product=createProductModel(phone);
        // Use the Product model to update the product
        const result = await Product.findByIdAndUpdate(productId, updatedProduct);
        Product.db.close();
        if (result) {
            return NextResponse.json({ success: true });
        } else {
            return new NextResponse("Product not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error updating product:", error);

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}



