import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Supplier from "@/models/supplierModel";

connect();


// Update supplier information
export async function PUT(request: any) {
    if (request.method !== "PUT") {
        return new NextResponse("Method not allowed", { status: 405 });
    }

    let body = await request.json();
    const { supplierId, updatedSupplier } = body;

    try {
        const result = await Supplier.findByIdAndUpdate(supplierId, updatedSupplier);

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
