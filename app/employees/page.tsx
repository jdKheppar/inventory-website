import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableEmp from "@/components/Tables/TableEmp";



const EmployeePage = () => {
    return (
        <>
            <Breadcrumb pageName="Employees" />

            <div className="flex flex-col gap-10">

                <TableEmp />
            </div>
        </>
    );
};

export default EmployeePage;
