// mongodb.js

import { MongoClient } from 'mongodb'


export async function connect() {
    
    const uri = process.env.MONGO_URI
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }

    let client;
    let clientPromise;

    if (!process.env.MONGO_URI) {
        throw new Error('Add Mongo URI to .env.local');
    }

    client = new MongoClient(uri, options);
    clientPromise = client.connect();
    console.log("Connected to MongoDB from dbonfig.js");
    return clientPromise;
}

//export default clientPromise