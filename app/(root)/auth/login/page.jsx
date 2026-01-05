"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { WEBSITE_REGISTER } from "../../../../routes/WebsiteRoute";
import { useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { z } from "zod";
import ButtonLoading from "@/components/application/ButtonLoading";

const formSchema = zSchema
	.pick({
		email: true,
	})
	.extend({ password: z.string().min("3", "Password is required!") });

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [isTypePassword, setIsTypePassword] = useState(true);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	//submit handler
	const handleLoginSubmit = async (values) => {
		console.log(values);
	};

	return (
		<Card className="w-full max-w-sm m-auto">
			<CardContent>
				<p className="text-2xl font-bold text-center">Logo</p>
				<p className="text-center mt-4">Log in to your account!</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleLoginSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="example@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="......"
											{...field}
											type={isTypePassword ? "password" : "text"}
										/>
									</FormControl>
									<button
										type="button"
										className="absolute top-1/2 right-2 cursor-pointer"
										onClick={() => setIsTypePassword(!isTypePassword)}
									>
										{isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
									</button>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<ButtonLoading
								type="submit"
								text="Login"
								loading={loading}
								className="w-full cursor-pointer"
							/>
						</div>
					</form>
				</Form>
				<div className="flex items-center justify-center gap-2">
					<p>Do not have a account?</p>
					<Link
						className="text-primary text-sm underline"
						href={WEBSITE_REGISTER}
					>
						Create an Account
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};

export default Login;
