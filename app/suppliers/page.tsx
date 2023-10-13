import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableFive from "@/components/Tables/TableFive";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Product Page",
    description: "This is Product page for Inventory Management System",
    // other metadata
};

const TablesPage = () => {
    return (
        <>
            <Breadcrumb pageName="Products" />

            <div className="flex flex-col gap-10">

                <TableFive />
            </div>
        </>
    );
};

export default TablesPage;
