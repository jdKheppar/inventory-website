import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';



export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        console.log("In mailer");
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }

        // Create a nodemailer transporter using your SMTP server's details
        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "junaidravian858@gmail.com",
                pass: "nidmnpomrfkfezjj"
            }
        });

        const mailOptions = {
            from: 'junaidravian858@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/auth/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/auth/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}</p>`
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};



