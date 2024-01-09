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



// Delete a product from the database
export async function DELETE(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        let Product = createProductModel(phone);
        const body = await request.json();
        const { productId } = body;

        // Use the Product model to delete the product
        const deletedProduct = await Product.findByIdAndDelete(productId);
        Product.db.close();
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


