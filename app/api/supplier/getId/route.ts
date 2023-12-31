import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Supplier from "@/models/supplierModel";



export async function GET(request: any) {
    connect(request);
    try {
        const url = new URL(request.url);
        const supplierName = url.searchParams.get("name");

        if (!supplierName) {
            return new NextResponse("Supplier name is required", { status: 400 });
        }

        // Use the Supplier model to find the supplier by name
        const supplier = await Supplier.findOne({ name: supplierName });

        if (supplier) {
            return NextResponse.json({ _id: supplier._id }); // Return the _id corresponding to the supplier name
        } else {
            return new NextResponse("Supplier not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching suplier details:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
