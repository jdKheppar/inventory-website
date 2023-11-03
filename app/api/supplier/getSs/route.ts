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

