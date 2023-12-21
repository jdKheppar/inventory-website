"use client";
import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";
import Link from "next/link";

const ViewEmployee = ({ params }: any) => {
    const employeeId = params.employeeId;
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        if (employeeId) {
            // Fetch employee details based on employeeId
            fetchEmployeeDetails(employeeId as string); // Cast employeeId to string
        }
    }, [employeeId]);

    async function fetchEmployeeDetails(employeeId: string) {
        try {
            const response = await fetch(`/api/employee/getE?id=${employeeId}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Failed to fetch employee details');
            }
            const employeeData = await response.json();
            setEmployee(employeeData.employee);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    }

    if (!employee) {
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
                Employee Details
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Employee Name:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">
                    {employee.name}
                </div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Employee position:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{employee.position}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Email address:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{employee.email}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Phone:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{employee.phone}</div>
            </div>

            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Address:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{employee.address}</div>
            </div>
            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Hire Date:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">
                    {new Date(employee.hireDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>            </div>
            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Salary:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{employee.salary}</div>
            </div>
            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Working Hours:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{employee.workingHours}</div>
            </div>
            <div className="my-4">
                <div className="text-xl font-semibold text-gray-700 dark:text-white">
                    Status:
                </div>
                <div className="text-lg text-gray-800 dark:text-white">{employee.status}</div>
            </div>


        </div>
    );
};

export default ViewEmployee;
