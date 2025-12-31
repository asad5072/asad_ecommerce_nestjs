"use client";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";

const Register = () => {
    const form = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    const [isTypePassword, setIsTypePassword] = useState(true);
    const [isConfirmTypePassword, setIsConfirmTypePassword] = useState(true);
    return (
      <Card className="w-full max-w-sm m-auto">        
        <CardContent>
          <p className="text-2xl font-bold text-center">Logo</p>
          <p className="text-center mt-4">Create an account!</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="John Doe"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
                      <Input placeholder="......" {...field} type={isTypePassword ? "password" : "text"} />
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
              <FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											type={isConfirmTypePassword ? "password" : "text"}
											placeholder="•••••••"
											{...field}
										/>
									</FormControl>
									<button
										type="button"
										className="absolute top-1/2 right-2 cursor-pointer"
										onClick={() =>
											setIsConfirmTypePassword(!isConfirmTypePassword)
										}
									>
										{isConfirmTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
									</button>
									<FormMessage />
								</FormItem>
							)}
						/>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </Form>
          <div className="flex items-center justify-center gap-2">
            <p>Already have a account?</p>
            <Link
              className="text-primary text-sm underline"
              href="#"
            >
              Login
            </Link>
          </div>
        </CardContent>        
      </Card>
    )
}

export default Register