"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";


const UpdateSupplier = ({ params }: any) => {
    const supplierId = params.supplierId;
    // Define state variables for form data
    const [formData, setFormData] = useState({
        supplierId: supplierId,
        updatedSupplier: {
            name: '',
            contactPerson: '',
            email: '',
            phone: '',
            address: '',
        }
    });
    async function fetchSupplierDetails(supplierId: string) {
        try {
            const response = await fetch(`/api/supplier/getS?id=${supplierId}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Failed to fetch supplier details');
            }
            const supplierData = await response.json();
            setFormData({
                ...formData,
                updatedSupplier: supplierData.supplier
            });
        } catch (error) {
            console.error('Error fetching supplier details:', error);
        }
    }
    // Handle form input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            updatedSupplier: {
                ...prevData.updatedSupplier,
                [name]: value
            }
        }));
        console.log("Form Data", formData);
    };

    // Handle form submission and API call
    async function update_Supplier(event: any) {
        //e.preventDefault(); e: React.FormEvent<HTMLFormElement>
        event.preventDefault();
        try {
            console.log(formData);
            fetch('/api/supplier/updateS', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) // Send the form data to the API
            })
                .then((response) => response.json())
                .then((data) => {
                    alert("Supplier updated successfully");
                    console.log(data)
                })
                .catch((error) => console.error(error));

        } catch (error) {
            console.error("Error adding a supplier:", error);
        }
    }

    useEffect(() => {
        if (supplierId) {
            // Fetch supplier details based on supplierId and populate the form fields
            console.log(supplierId)
            fetchSupplierDetails(supplierId as string);
        }

    }, [supplierId]); // Run this effect when supplierId changes
    return (
        <>
            <Breadcrumb pageName="Update supplier" />
            <div className="flex flex-col gap-9 items-center justify-center">
                {/* <!-- Add supplier Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Edit Details of the Supplier
                        </h3>
                    </div>
                    <form onSubmit={update_Supplier}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Supplier name
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.updatedSupplier.name}
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Enter the supplier name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact person name
                                    </label>
                                    <input
                                        name="contactPerson"
                                        value={formData.updatedSupplier.contactPerson}
                                        onChange={handleInputChange}
                                        type="text"

                                        placeholder="Enter the contact person name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    name="email"
                                    value={formData.updatedSupplier.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    placeholder="Enter the email"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Phone <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    name="phone"
                                    value={formData.updatedSupplier.phone}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the supplier sku"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.updatedSupplier.address}
                                    onChange={handleInputChange}
                                    rows={6}
                                    placeholder="Enter the address here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                Update Supplier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateSupplier;
