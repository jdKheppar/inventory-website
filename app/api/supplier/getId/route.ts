import { NextRequest, NextResponse } from "next/server";
import createSupplierModel from "@/models/supplierModel";
//import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import jwt from "jsonwebtoken";

const getPhoneFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.phone;
    } catch (error: any) {
        throw new Error(error.message);
    }

}


export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        let Supplier = createSupplierModel(phone);
        const url = new URL(request.url);
        const supplierName = url.searchParams.get("name");
        Supplier.db.close();
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
