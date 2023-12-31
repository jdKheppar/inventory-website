import mongoose from 'mongoose';
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
let isConnected: boolean = false;

export async function connect(request: NextRequest) {
    try {
        let phone;
        try {
            const token = request.cookies.get("token")?.value || '';
            const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
            phone = decodedToken.phone;
        }
        catch (error: any) {
            throw new Error(error.message);
        }
        let complete_URI = process.env.BASE_MONGO_URI! + phone + "?retryWrites=true&w=majority"
        console.log("complete_uri is", complete_URI);
        // Disconnect from existing connections
        //await mongoose.disconnect();
        await mongoose.connect(complete_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully in dbConfig');
            return true;
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);

    }
}