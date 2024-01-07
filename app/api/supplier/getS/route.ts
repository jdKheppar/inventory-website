import { NextResponse } from "next/server";
import createSupplierModel from "@/models/supplierModel";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";


// Create a new API route for getting product details by _id
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        let Supplier=createSupplierModel(phone);

        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if (!id) {
            return new NextResponse("Supplier ID is required", { status: 400 });
        }

        // Use the Supplier model to find the supplier by _id
        const supplier = await Supplier.findById(id);
        Supplier.db.close();
        if (supplier) {
            return NextResponse.json({ supplier });
        } else {
            return new NextResponse("Supplier not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching supplier details:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
