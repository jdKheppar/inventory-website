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



// Delete a supplier from the database
export async function DELETE(request: any) {
    let phone = await getPhoneFromToken(request);
    try {
        let Supplier = createSupplierModel(phone);
        const body = await request.json();
        const { supplierId } = body;

        const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
        Supplier.db.close();
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

