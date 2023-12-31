import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel"; // Import your Product model here




// Delete a product from the database
export async function DELETE(request: any) {
    connect(request);
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


