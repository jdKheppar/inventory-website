import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableProduct from "@/components/Tables/TableProduct";

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">

        <TableProduct />
      </div>
    </>
  );
};

export default TablesPage;
