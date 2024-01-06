import mongoose from 'mongoose';

export async function connect(userDbName: string) {
    try {
        await mongoose.disconnect();
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: userDbName,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        // mongoose.connect(process.env.USERS_MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
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