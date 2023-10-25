"use client";
import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";
import Link from "next/link";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Import icons


const TableEmp = () => {
    const [fetchedEmployees, setFetchedEmployees] = useState<Employee[]>([]);

    async function fetchEmployees() {
        try {
            const response = await fetch("/api/employee/getEs", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }

            const data = await response.json();
            setFetchedEmployees(data.allEmployees)
            console.log("fetched Employees are", fetchedEmployees);
        } catch (error) {
            console.error("Error fetching Employees:", error);
        }
    }
    async function deleteEmployee(EmployeeId: string) {
        try {
            const response = await fetch('/api/employee/deleteE', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employeeId: EmployeeId,
                }),
            });

            if (response.ok) {
                // Employee was successfully deleted
                // Remove the deleted Employee from the state
                setFetchedEmployees((prevEmployees) =>
                    prevEmployees.filter((Employee) => Employee._id !== EmployeeId)
                );
                return 'Employee deleted successfully';
            } else if (response.status === 404) {
                // Employee not found
                return 'Employee not found';
            } else {
                // Other error
                return 'Failed to delete Employee';
            }
        } catch (error: any) {
            // Network or other errors
            return 'Error deleting Employee: ' + error.message;
        }
    }

    function handleDeleteEmployee(EmployeeId: any) {
        const confirmation = window.confirm(
            'Are you sure you want to delete this Employee?'
        );
        if (confirmation) {
            deleteEmployee(EmployeeId);
        }
    }
    // Use useEffect to fetch suppliers when the component loads
    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
                <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Top Employees
                    </h4>
                    <Link href="/employees/addEmployee">
                        <button
                            className="text-xl font-semibold hover:underline cursor-pointer"
                        >
                            All Employee
                        </button>
                    </Link>

                </div>

            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Employee Name</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                    <p className="font-medium">Position</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Salary</p>
                </div>

                <div className="hidden sm:flex col-span-1 items-center">
                    <p className="font-medium">Working Hours</p>
                </div>
            </div>
            {fetchedEmployees && fetchedEmployees.length > 0 ? (
                fetchedEmployees.map((employee, key) => (
                    <div
                        className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                        key={key}
                    >
                        <div className="col-span-2 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <p className="text-sm text-black dark:text-white">
                                    {employee.name}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">
                                {employee.position}
                            </p>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <p className="text-sm text-black dark:text-white">
                                {employee.salary}
                            </p>
                        </div>

                        <div className="hidden sm:flex col-span-1 items-center">
                            <p className="text-sm text-black">{employee.workingHours}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            {/* View, Edit and Delete icons */}
                            <Link href={`/employees/viewEmployee/${employee._id}`}>
                                <FaEye className="text-green-600 hover:cursor-pointer mx-2" />
                            </Link>
                            <Link href={`/employees/updateEmployee/${employee._id}`}>
                                <FaEdit className="text-blue-600 hover:cursor-pointer mx-2" />
                            </Link>

                            <FaTrash
                                onClick={() => handleDeleteEmployee(employee._id)}
                                className="text-red-600 hover:cursor-pointer mx-2"
                            />

                        </div>
                    </div>
                ))
            ) : (
                <div className="m-4">No employees available.</div>
            )}

        </div>
    );
};

export default TableEmp;
