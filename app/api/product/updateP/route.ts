import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel"; // Import your Product model here


// Update a product information
export async function PUT(request: any) {
    connect(request);
    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    let body = await request.json();
    const { productId, updatedProduct } = body;

    try {
        // Use the Product model to update the product
        const result = await Product.findByIdAndUpdate(productId, updatedProduct);

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



