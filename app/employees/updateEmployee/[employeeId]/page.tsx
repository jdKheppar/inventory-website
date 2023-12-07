"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";


const UpdateEmployee = ({ params }: any) => {
    const employeeId = params.employeeId;
    // Define state variables for form data
    const [formData, setFormData] = useState({
        employeeId: employeeId,
        updatedEmployee: {
            name: '',
            email: '',
            phone: '',
            address: '',
            position: '',
            hireDate: '',
            salary: 0,
            workingHours: '',
            status: '',
        }
    });
    async function fetchEmployeeDetails(employeeId: string) {
        try {
            const response = await fetch(`/api/employee/getE?id=${employeeId}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Failed to fetch employee details');
            }
            const employeeData = await response.json();
            setFormData({
                ...formData,
                updatedEmployee: employeeData.employee
            });
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    }
    // Handle form input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            updatedEmployee: {
                ...prevData.updatedEmployee,
                [name]: value
            }
        }));
        console.log("Form Data", formData);
    };

    // Handle form submission and API call
    async function update_Employee(event: any) {

        //event.preventDefault();
        try {
            console.log(formData);
            fetch('/api/employee/updateE', {
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
            console.error("Error adding a employee:", error);
        }
    }

    useEffect(() => {
        if (employeeId) {
            // Fetch employee details based on employeeId and populate the form fields
            console.log(employeeId)
            fetchEmployeeDetails(employeeId as string);
        }

    }, [employeeId]); // Run this effect when employeeId changes
    return (
        <>
            <Breadcrumb pageName="Edit Employee" />
            <div className="flex flex-col gap-9 items-center justify-center">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Edit Details of the Employee
                        </h3>
                    </div>
                    <form onSubmit={update_Employee}>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Employee name
                                </label>
                                <input
                                    name="name"
                                    value={formData.updatedEmployee.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the employee name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    value={formData.updatedEmployee.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    placeholder="Enter the email"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Phone
                                </label>
                                <input
                                    name="phone"
                                    value={formData.updatedEmployee.phone}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the employee phone"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.updatedEmployee.address}
                                    onChange={handleInputChange}
                                    rows={6}
                                    placeholder="Enter the address here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                ></textarea>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Position
                                </label>
                                <input
                                    name="position"
                                    value={formData.updatedEmployee.position}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the employee's position"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Hire Date
                                </label>
                                <input
                                    name="hireDate"
                                    value={formData.updatedEmployee.hireDate}
                                    onChange={handleInputChange}
                                    type="date"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Salary
                                </label>
                                <input
                                    name="salary"
                                    value={formData.updatedEmployee.salary}
                                    onChange={handleInputChange}
                                    type="number"
                                    placeholder="Enter the employee's salary"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Working Hours
                                </label>
                                <input
                                    name="workingHours"
                                    value={formData.updatedEmployee.workingHours}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter the employee's working hours"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.updatedEmployee.status}
                                    onChange={handleInputChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                >
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Terminated">Terminated</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                            >
                                Update Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateEmployee;