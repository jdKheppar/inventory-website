import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableFive from "@/components/Tables/TableFive";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Supplier Page",
    description: "This is Supplier page for Inventory Management System",
    // other metadata
};

const SupplierPage = () => {
    return (
        <>
            <Breadcrumb pageName="Suppliers" />

            <div className="flex flex-col gap-10">

                <TableFive />
            </div>
        </>
    );
};

export default SupplierPage;
