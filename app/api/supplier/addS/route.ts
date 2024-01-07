import { NextResponse } from "next/server";
import createSupplierModel from "@/models/supplierModel";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";



// Add a new supplier to the database
export async function POST(request: any) {
    let phone = await getPhoneFromToken(request);
    
    let body = await request.json();

    try {
        let Supplier=createSupplierModel(phone);
        const newSupplier = new Supplier(body);

        const savedSupplier = await newSupplier.save();
        Supplier.db.close();
        return NextResponse.json({ savedSupplier });
    } catch (error) {
        console.error("Error adding a supplier:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}



