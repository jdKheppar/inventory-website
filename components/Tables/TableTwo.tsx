"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Link from "next/link";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Import icons


const TableTwo = () => {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/product/getPs", {
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
  async function deleteProduct(productId: string) {
    try {
      const response = await fetch('/api/product/deleteP', {
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
        // Remove the deleted product from the state
        setFetchedProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        return 'Product deleted successfully';
      } else if (response.status === 404) {
        // Product not found
        return 'Product not found';
      } else {
        // Other error
        return 'Failed to delete product';
      }
    } catch (error: any) {
      // Network or other errors
      return 'Error deleting product: ' + error.message;
    }
  }

  function handleDeleteProduct(productId: any) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmation) {
      deleteProduct(productId);
    }
  }
  // Use useEffect to fetch products when the component loads
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Top Products
          </h4>
          <Link href="/products/addProduct">
            <button

              className="text-xl font-semibold hover:underline cursor-pointer"
            >
              Add Product
            </button>
          </Link>

        </div>

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
            <p className="text-sm text-black">{product.quantity}</p>
          </div>
          <div className="col-span-1 flex items-center">
            {/* View, Edit and Delete icons */}
            <Link href={`/products/viewProduct/${product._id}`}>
              <FaEye className="text-green-600 hover:cursor-pointer mx-2" />
            </Link>
            <Link href={`/products/updateProduct/${product._id}`}>
              <FaEdit className="text-blue-600 hover:cursor-pointer mx-2" />
            </Link>

            <FaTrash
              onClick={() => handleDeleteProduct(product._id)}
              className="text-red-600 hover:cursor-pointer mx-2"
            />

          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
