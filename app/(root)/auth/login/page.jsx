"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = zSchema
	.pick({
		email: true,
	})
	.extend({ password: z.string().min("3", "Password is required!") });

const Login = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit = (data) => {
		console.log(data);
	};
	const [isTypePassword, setIsTypePassword] = useState(true);
	return (
		<Card className="w-full max-w-sm m-auto">
			<CardContent>
				<p className="text-2xl font-bold text-center">Logo</p>
				<p className="text-center mt-4">Log in to your account!</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
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
						<Button
							type="submit"
							className="w-full"
						>
							Login
						</Button>
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
