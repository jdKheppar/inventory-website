import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel"; // Import your Product model here



// Add a product to the database
export async function POST(request: any) {
    connect(request);
    let body = await request.json();

    try {
        // Create a new product using the Product model
        const newProduct = new Product(body);
        // Save the new product to the database
        const savedProduct = await newProduct.save();
        return NextResponse.json({ savedProduct });
    } catch (error) {
        console.error("Error adding a product:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}


