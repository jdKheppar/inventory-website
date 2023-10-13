"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";



const TableTwo = () => {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);

  async function uploadProducts() {
    try {
      fetch('/api/addP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Apple Watch Series 7",
          description: "Product of apple for wearing on wrists",
          price: 296,
          quantity: 1,
          unitOfMeasure: "Dollar",
          category: "Electronics",
          brand: "Apple",
          sku: "3345-3434-22",
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

    } catch (error) {
      console.error("Error adding a product:", error);
    }
  }
  async function fetchProducts() {
    try {
      const response = await fetch("/api/product/getP", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setFetchedProducts(data.allProducts)
      console.log("fethed porducts are", fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  async function deleteProduct(productId: any) {
    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      if (response.ok) {
        // Product was successfully deleted
        return 'Product deleted successfully';
      } else if (response.status === 404) {
        // Product not found
        return 'Product not found';
      } else {
        // Other error
        return 'Failed to delete product';
      }
    } catch (error) {
      // Network or other errors
      return 'Error deleting product: ';
    }
  }
  // Use useEffect to fetch products when the component loads
  useEffect(() => {
    fetchProducts();
    //deleteProduct(2323238293);

  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Brand</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Quntity</p>
        </div>
      </div>

      {fetchedProducts.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.brand}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
