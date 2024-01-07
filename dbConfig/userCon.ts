// import mongoose from 'mongoose';
// let isConnected: boolean = false;
// let dbName: string = "noname";

// export async function connect(userDbName: string) {
//     try {
//         if ((dbName === userDbName) && isConnected) {
//             console.log('MongoDB is already connected.');
//             return true;
//         }
//         else{
//             console.log("connecting to db");
//             dbName=userDbName;

//         }
//         mongoose.connection.setMaxListeners(20);

//         const connection = mongoose.createConnection(process.env.MONGO_URI!, {
//             dbName: userDbName,

//             });


//         connection.on('connected', () => {
//             console.log('MongoDB connected successfully');
//             isConnected = true;
//             return true;
//         })

//         connection.on('error', (err) => {
//             console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
//             process.exit();
//             return false;
//         })

//     } catch (error) {
//         console.log('Something goes wrong!');
//         console.log(error);
//         return false;

//     }
// }


import mongoose from 'mongoose';

let isConnected: boolean = false;
let dbName: string = "";

export function connect(userDbName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (isConnected && (dbName === userDbName)) {
            console.log('MongoDB is already connected.');
            resolve();
        } else {
            mongoose.connection.setMaxListeners(20);

            // const connectionPromise = mongoose.connect(process.env.MONGO_URI!, {
            //     dbName: userDbName,
            // });
            const connection = mongoose.createConnection(process.env.MONGO_URI!);

            const newDb = connection.useDb(userDbName);
            //const initialConnection = mongoose.connection.useDb(userDbName);
            connection.on('connected', () => {
                console.log('MongoDB connected successfully');
                isConnected = true;
                dbName = userDbName;
                resolve();
                return true;
            })

            connection.on('error', (err) => {
                console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
                reject(err);
                process.exit();
            })


            // connectionPromise.then(() => {
            //     console.log('MongoDB connected successfully');
            //     isConnected = true;
            //     dbName = userDbName;
            //     resolve();
            // }).catch((err) => {
            //     console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            //     reject(err);
            // });
        }
    });
}
