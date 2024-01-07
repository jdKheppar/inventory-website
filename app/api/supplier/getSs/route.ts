import { NextResponse } from "next/server";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import createSupplierModel from "@/models/supplierModel";



// Get all suppliers from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);

    try {
        let Supplier=createSupplierModel(phone);
        const allSuppliers = await Supplier.find({});
        Supplier.db.close();
        return NextResponse.json({ allSuppliers });
    } catch (error) {
        console.error("Error fetching suppliers:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

