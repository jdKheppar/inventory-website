import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const UsersDB=mongoose.createConnection(process.env.USERS_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = UsersDB.models.users || UsersDB.model("users", userSchema);

export default User;
