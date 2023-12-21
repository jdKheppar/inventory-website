"use client";
import { useEffect, useState } from "react";
import { Supplier } from "@/types/supplier";
import Link from "next/link";

const ViewSupplier = ({ params }: any) => {
    const supplierId = params.supplierId;
    const [supplier, setSupplier] = useState<Supplier | null>(null);

    useEffect(() => {
        if (supplierId) {
            // Fetch supplier details based on supplierId
            fetchsupplierDetails(supplierId as string); // Cast supplierId to string
        }
    }, [supplierId]);

    async function fetchsupplierDetails(supplierId: string) {
        try {
            const response = await fetch(`/api/supplier/getS?id=${supplierId}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Failed to fetch supplier details');
            }
            const supplierData = await response.json();
            setSupplier(supplierData.supplier);
        } catch (error) {
            console.error('Error fetching supplier details:', error);
        }
    }

    if (!supplier) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-700 dark:text-white">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
                Supplier Details
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Supplier Name:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">
                    {supplier.name}
                </div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Contact person name:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{supplier.contactPerson}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Email address:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{supplier.email}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Phone:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{supplier.phone}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Address:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{supplier.address}</div>
            </div>


        </div>
    );
};

export default ViewSupplier;
