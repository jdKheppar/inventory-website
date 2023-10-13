import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Supplier from "@/models/supplierModel";

connect();

// Get all suppliers from the database
export async function GET(request: any) {
    try {
        const allSuppliers = await Supplier.find({});

        return NextResponse.json({ allSuppliers });
    } catch (error) {
        console.error("Error fetching suppliers:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

// Add a new supplier to the database
export async function POST(request: any) {
    let body = await request.json();

    try {
        const newSupplier = new Supplier(body);

        const savedSupplier = await newSupplier.save();

        return NextResponse.json({ savedSupplier });
    } catch (error) {
        console.error("Error adding a supplier:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

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
