import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel"; // Import your Product model here

connect();

// Get all the products from the database
export async function GET(request: any) {
  try {
    const allProducts = await Product.find({}); // Use the Product model to find all products

    return NextResponse.json({ allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Add a product to the database
export async function POST(request: any) {
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

// Delete a product from the database
export async function DELETE(request: any) {
  try {
    const body = await request.json();
    const { productId } = body;

    // Use the Product model to delete the product
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      return NextResponse.json({ message: "Product deleted successfully" });
    } else {
      return new NextResponse("Product not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting product:", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Update a product information
export async function PUT(request: any) {
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
