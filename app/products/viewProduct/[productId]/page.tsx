"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Link from "next/link";

const ViewProduct = ({ params }: any) => {
    const productId = params.productId;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (productId) {
            // Fetch product details based on productId
            fetchProductDetails(productId as string); // Cast productId to string
        }
    }, [productId]);

    async function fetchProductDetails(productId: string) {
        try {
            const response = await fetch(`/api/product/getP?id=${productId}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const productData = await response.json();
            setProduct(productData.product);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    if (!product) {
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
                Product Details
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Product Name:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">
                    {product.name}
                </div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Price:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">${product.price}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    SKU:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{product.sku}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Brand:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{product.brand}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Category:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{product.category}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Quantity:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{product.quantity}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Description:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{product.description}</div>
            </div>

            <div className="my-4">
                <Link href="/supplier-details"> {/* Replace with your supplier details page */}
                    <a className="text-xl text-blue-600 hover:underline">Click here for supplier details</a>
                </Link>
            </div>
        </div>
    );
};

export default ViewProduct;
