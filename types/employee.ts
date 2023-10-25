export type Employee = {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    position: string;
    hireDate: Date;
    salary: number;
    workingHours: string;
    status: "Active" | "On Leave" | "Terminated";
}