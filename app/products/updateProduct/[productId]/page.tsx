"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Supplier } from "@/types/supplier";
import { useEffect, useState } from 'react';
export const metadata: Metadata = {
    title: "Update Product Page | Next.js Inventory Management Website",
    description: "This is Updte Product page Next.js",
    // other metadata
};

const UpdateProduct = ({ params }: any) => {
    const productId = params.productId;
    const [fetchedSuppliers, setFetchedSuppliers] = useState<Supplier[]>([]);
    // Define state variables for form data
    const [formData, setFormData] = useState({
        productId: productId, // Include productId separately
        updatedProduct: {
            name: '',
            price: 0,
            category: '',
            quantity: 0,
            sku: '',
            brand: '',
            unitOfMeasure: '',
            description: ''
        }
    });

    async function fetchProductDetails(productId: string) {
        try {
            const response = await fetch(`/api/product/getP?id=${productId}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const productData = await response.json();
            setFormData(productData.product);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }
    // Handle form input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission and API call
    async function update_Product() {
        //e.preventDefault(); e: React.FormEvent<HTMLFormElement>

        try {
            console.log(formData);
            fetch('/api/product/updateP', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) // Send the form data to the API
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));

        } catch (error) {
            console.error("Error adding a product:", error);
        }
    }
    async function fetchSuppliers() {
        try {
            const response = await fetch("/api/supplier/getS", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch suppliers");
            }

            const data = await response.json();
            setFetchedSuppliers(data.allSuppliers)
            console.log("fetched suppliers are", fetchedSuppliers);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    }
    useEffect(() => {
        fetchSuppliers();
    }, []);
    useEffect(() => {
        if (productId) {
            // Fetch product details based on productId and populate the form fields
            console.log(productId)
            fetchProductDetails(productId as string);
        }
        fetchSuppliers();
    }, [productId]); // Run this effect when productId changes
    return (
        <>
            <Breadcrumb pageName="Update Product" />
            <div className="flex flex-col gap-9 items-center justify-center">
                {/* <!-- Add Product Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Edit Details of the Product
                        </h3>
                    </div>
                    <form onSubmit={update_Product}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product name
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.updatedProduct.name}
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Enter the product name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product price
                                    </label>
                                    <input
                                        name="price"
                                        value={formData.updatedProduct.price}
                                        onChange={handleInputChange}
                                        type="number"
                                        min="0"
                                        placeholder="Enter the product price"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Category <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    name="category"
                                    value={formData.updatedProduct.category}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the product category"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Quntity <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    name="quantity"
                                    value={formData.updatedProduct.quantity}
                                    onChange={handleInputChange}
                                    type="number"
                                    min="0"
                                    placeholder="Enter the product quntity or stock"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    SKU <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    name="sku"
                                    value={formData.updatedProduct.sku}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the product sku"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Brand <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    name="brand"
                                    value={formData.updatedProduct.brand}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the product brand"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Unit of measure
                                </label>
                                <input
                                    name="unitOfMeasure"
                                    value={formData.updatedProduct.unitOfMeasure}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the unit of measure"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>



                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Product Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.updatedProduct.description}
                                    onChange={handleInputChange}
                                    rows={6}
                                    placeholder="Write product description here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateProduct;
