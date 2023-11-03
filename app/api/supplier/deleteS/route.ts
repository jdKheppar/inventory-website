import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Supplier from "@/models/supplierModel";

connect();


// Delete a supplier from the database
export async function DELETE(request: any) {
    try {
        const body = await request.json();
        const { supplierId } = body;

        const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);

        if (deletedSupplier) {
            return NextResponse.json({ message: "Supplier deleted successfully" });
        } else {
            return new NextResponse("Supplier not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting supplier:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

