import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableFive from "@/components/Tables/TableFive";



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
