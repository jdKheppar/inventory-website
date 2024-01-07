import { NextResponse } from "next/server";
import createSupplierModel from "@/models/supplierModel";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";




// Update supplier information
export async function PUT(request: any) {
    let phone = await getPhoneFromToken(request);
    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }
    let Supplier=createSupplierModel(phone);

    let body = await request.json();
    const { supplierId, updatedSupplier } = body;

    try {
        const result = await Supplier.findByIdAndUpdate(supplierId, updatedSupplier);
        Supplier.db.close();
        if (result) {
            
            return NextResponse.json({ success: true });
        } else {
            return new NextResponse("Supplier not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error updating supplier:", error);

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
