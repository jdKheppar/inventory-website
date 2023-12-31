"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import { Supplier } from "@/types/supplier";
import { useEffect } from "react";


const AddProduct = () => {
    const [fetchedSuppliers, setFetchedSuppliers] = useState<Supplier[]>([]);
    // Define state variables for form data
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        category: '',
        quantity: 1,
        sku: '',
        brand: '',
        unitOfMeasure: '',
        supplier: '', // Add a state variable for the selected supplier
        description: ''
    });
    // Handle form input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission and API call
    async function uploadProducts(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); 

        try {
            console.log(formData);
            fetch('/api/product/addP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) // Send the form data to the API
            })
                .then((response) => response.json())
                .then((data) =>{
                    const initialFormData = {
                        name: '',
                        price: 0,
                        category: '',
                        quantity: 1,
                        sku: '',
                        brand: '',
                        unitOfMeasure: '',
                        supplier: '', // Add a state variable for the selected supplier
                        description: ''
                    };
                    setFormData(initialFormData);
                    alert("Product added successfully");
                    console.log(data)
                })
                .catch((error) => console.error(error));

        } catch (error) {
            console.error("Error adding a product:", error);
        }
    }
    async function fetchSuppliers() {

        try {
            const response = await fetch("/api/supplier/getSs", {
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
    return (
        <>
            <Breadcrumb pageName="Add Product" />
            <div className="flex flex-col gap-9 items-center justify-center">
                {/* <!-- Add Product Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Add Details of the Product
                        </h3>
                    </div>
                    <form onSubmit={uploadProducts}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product name
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.name}
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
                                        value={formData.price}
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
                                    value={formData.category}
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
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    type="number"
                                    min="1"
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
                                    value={formData.sku}
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
                                    value={formData.brand}
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
                                    value={formData.unitOfMeasure}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the unit of measure"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Select the supplier
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <select
                                        name="supplier"
                                        value={formData.supplier}
                                        onChange={handleInputChange}
                                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                        <option value="">Type your supplier</option>
                                        {fetchedSuppliers.map((supplier, key) => (
                                            <option key={key} value={supplier._id}>
                                                {supplier.name}
                                            </option>
                                        ))}


                                    </select>
                                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                        <svg
                                            className="fill-current"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.8">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                    fill=""
                                                ></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Product Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={6}
                                    placeholder="Write product description here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
