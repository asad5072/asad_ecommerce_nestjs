import { connectDB } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { response, catchError } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        400,
        "Invalid or missing input fields",
        validatedData.error.flatten()
      );
    }

    const { name, email, password } = validatedData.data;

    // check user exists
    const checkUser = await UserModel.exists({ email });
    if (checkUser) {
      return response(false, 409, "User already exists");
    }

    const newRegistration = new UserModel({
      name,
      email,
      password,
    });

    await newRegistration.save();

    // generate email verification token
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: newRegistration._id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    await sendMail(
      "Email verification request from Kazi Asad",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register/verify-email/${token}`
      )
    );

    return response(
      true,
      200,
      "User created successfully! Please check your email for verification."
    );
  } catch (error) {
    return catchError(error);
  }
}
