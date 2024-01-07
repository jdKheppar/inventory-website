const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB from dbm.js"))
.catch(err => console.log(err));

const UsersDB=mongoose.createConnection(process.env.USERS_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function createPhoneDBConnection(dbName) {
    return mongoose.createConnection(`${process.env.MONGO_URI}${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
module.exports = {
    mongoose,
    UsersDB,
    createPhoneDBConnection
};