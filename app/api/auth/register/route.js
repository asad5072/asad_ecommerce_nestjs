import { connectDB } from "@/lib/databaseConnection";
import { z } from "zod";
import { zSchema } from "@/lib/zodSchema";
import { response, catchError } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { SignJWT } from "jose";

export async function POST(request) {
    try {
      await connectDB();
      const validationSchema = zSchema.pick({
        name: true,
        email: true,
        password: true,
      });
      const payload = await request.json();
      const validatedData = validationSchema.parse(payload);
      console.log(validatedData);
      if (!validatedData.success) {
        return response(false, 401, "Invalid or missing input fields", validatedData.error);
      }
      const { name, email, password } = validatedData.data;
      
      // checking user already axist or not
      const checkUser = await UserModel.exists({ email });      
      if (checkUser) {
        return response(true, 409, "User already exists");
      }
      // new registration
      const newRegistration = new UserModel({
        name,
        email,
        password,
      });
      await newRegistration.save();
      

      //generate token
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT()
        .setPayload({ userId: newRegistration._id })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      await sendMail("Email verification request from Kazi Asad", email, emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register/verify-email/${token}`));

      return response(true, 200, "User created successfully! Please check your email for verification.");

    } catch (error) {
      return catchError(error);
    }
}