import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel"; // Import your Product model here

// Get all the products from the database
export async function GET(request: any) {
  await connect(request);
  try {
    const allProducts = await Product.find({}); // Use the Product model to find all products
    return NextResponse.json({ allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}

