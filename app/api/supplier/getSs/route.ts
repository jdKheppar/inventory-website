import { NextRequest, NextResponse } from "next/server";
//import { getPhoneFromToken } from "@/helpers/getPhoneFromToken";
import createSupplierModel from "@/models/supplierModel";
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


// Get all suppliers from the database
export async function GET(request: any) {
    let phone = await getPhoneFromToken(request);

    try {
        let Supplier = createSupplierModel(phone);
        const allSuppliers = await Supplier.find({});
        Supplier.db.close();
        return NextResponse.json({ allSuppliers });
    } catch (error) {
        console.error("Error fetching suppliers:", error);

        return new NextResponse("Internal server error", { status: 500 });
    }
}

