import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableSupplier from "@/components/Tables/TableSupplier";



const SupplierPage = () => {
    return (
        <>
            <Breadcrumb pageName="Suppliers" />

            <div className="flex flex-col gap-10">

                <TableSupplier />
            </div>
        </>
    );
};

export default SupplierPage;
