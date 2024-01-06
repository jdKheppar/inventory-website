import { NextResponse } from "next/server";
import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import { connect } from "@/dbConfig/userCon";
import Supplier from "@/models/supplierModel";



// Get all suppliers from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    await connect(phone);

    try {
        const allSuppliers = await Supplier.find({});

        return NextResponse.json({ allSuppliers });
    } catch (error) {
        console.error("Error fetching suppliers:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

