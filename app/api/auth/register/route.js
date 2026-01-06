import { connectDB } from "@/lib/databaseConnection";
import { z } from "zod";
import { zSchema } from "@/lib/zodSchema";
import { response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";

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
      return response(true, 201, "User created successfully", newRegistration);

    } catch (error) {
      console.log(error);
      return response(false, 500, "Internal server error", error);
    }
}