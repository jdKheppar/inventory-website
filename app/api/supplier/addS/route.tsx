import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Supplier from "@/models/supplierModel";

connect();


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



