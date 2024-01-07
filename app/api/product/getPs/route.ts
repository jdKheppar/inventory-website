import { NextResponse } from "next/server";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import createProductModel from "@/models/productModel"; // Import your Product model here


// Get all the products from the database
export async function GET(request: any) {
  let phone = await getPhoneFromToken(request);

  try {
    let Product=createProductModel(phone);
    const allProducts = await Product.find({}); // Use the Product model to find all products
    // Close the connection
    Product.db.close();
    // Log connection state after attempting to close
    console.log("Connection state after attempting to close:", Product.db.readyState);

    return NextResponse.json({ allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}

