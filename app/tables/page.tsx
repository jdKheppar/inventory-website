import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableTwo from "@/components/Tables/TableTwo";
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

        <TableTwo />
      </div>
    </>
  );
};

export default TablesPage;
