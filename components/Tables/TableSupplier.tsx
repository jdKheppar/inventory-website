"use client";
import { useEffect, useState } from "react";
import { Supplier } from "@/types/supplier";
import Link from "next/link";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Import icons


const TableSupplier = () => {
    const [fetchedSuppliers, setFetchedSuppliers] = useState<Supplier[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

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
    async function deleteSupplier(SupplierId: string) {
        try {
            const response = await fetch('/api/supplier/deleteS', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    supplierId: SupplierId,
                }),
            });

            if (response.ok) {
                // Supplier was successfully deleted
                // Remove the deleted Supplier from the state
                setFetchedSuppliers((prevSuppliers) =>
                    prevSuppliers.filter((Supplier) => Supplier._id !== SupplierId)
                );
                return 'Supplier deleted successfully';
            } else if (response.status === 404) {
                // Supplier not found
                return 'Supplier not found';
            } else {
                // Other error
                return 'Failed to delete Supplier';
            }
        } catch (error: any) {
            // Network or other errors
            return 'Error deleting Supplier: ' + error.message;
        }
    }

    function handleDeleteSupplier(SupplierId: any) {
        const confirmation = window.confirm(
            'Are you sure you want to delete this Supplier?'
        );
        if (confirmation) {
            deleteSupplier(SupplierId);
        }
    }
    async function searchSuppliers(query: string) {
        const apiUrl = '/api/supplier/searchS'; // Replace with the actual API endpoint
        const url = new URL(apiUrl, window.location.origin); // Construct the full URL

        // Add the query parameter to the URL
        url.searchParams.append('query', query);

        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Suppliers:', data.allSuppliers);
                setFetchedSuppliers(data.allSuppliers);
                // Handle the result as needed in your application
            } else {
                throw new Error('Failed to fetch suppliers');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle errors appropriately
        }
    }


    useEffect(() => {
        if (searchQuery.trim() !== "") {
            searchSuppliers(searchQuery);
        } else {
            fetchSuppliers();
        }
    }, [searchQuery]);

    // Use useEffect to fetch suppliers when the component loads
    useEffect(() => {
        fetchSuppliers();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
                <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        All suppliers
                    </h4>
                    <div className="hidden sm:block">
                        <div className="relative">
                            <button

                                className="absolute left-0 top-1/2 -translate-y-1/2"


                            >
                                <svg
                                    className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                        fill=""
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                        fill=""
                                    />
                                </svg>
                            </button>

                            <input
                                type="text"
                                placeholder="Type to search suppliers..."
                                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"

                                name="search"
                                id="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <Link href="/suppliers/addSupplier">
                        <button
                            className="text-xl font-semibold hover:underline cursor-pointer"
                        >
                            Add supplier
                        </button>
                    </Link>

                </div>

            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Supplier Name</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                    <p className="font-medium">Contact Person</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Phone</p>
                </div>

                <div className="hidden sm:flex col-span-1 items-center">
                    <p className="font-medium">Address</p>
                </div>
            </div>
            {fetchedSuppliers && fetchedSuppliers.length > 0 ? (
                fetchedSuppliers.map((supplier, key) => (
                    <div
                        className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                        key={key}
                    >
                        <div className="col-span-2 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <p className="text-sm text-black dark:text-white">
                                    {supplier.name}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">
                                {supplier.contactPerson}
                            </p>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">
                                {supplier.phone}
                            </p>
                        </div>

                        <div className="hidden sm:flex col-span-1 items-center">
                            <p className="text-sm text-black">{supplier.address}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            {/* View, Edit and Delete icons */}
                            <Link href={`/suppliers/viewSupplier/${supplier._id}`}>
                                <FaEye className="text-green-600 hover:cursor-pointer mx-2" />
                            </Link>
                            <Link href={`/suppliers/updateSupplier/${supplier._id}`}>
                                <FaEdit className="text-blue-600 hover:cursor-pointer mx-2" />
                            </Link>

                            <FaTrash
                                onClick={() => handleDeleteSupplier(supplier._id)}
                                className="text-red-600 hover:cursor-pointer mx-2"
                            />

                        </div>
                    </div>
                ))
            ) : (
                <div>No suppliers available.</div>
            )}

        </div>
    );
};

export default TableSupplier;
