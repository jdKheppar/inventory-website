import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

connect();

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
