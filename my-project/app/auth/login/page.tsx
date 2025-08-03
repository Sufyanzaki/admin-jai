"use client"

import React, {useState} from "react"
import {Eye, EyeOff, Lock, Mail} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import useLoginForm from "@/app/auth/_hooks/useLoginForm";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading
  } = useLoginForm()

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img src="https://ticketprijs.nl/admin/logoImages/1730182765_logo%20(1).png" alt="Logo" className="mx-auto" />
          </div>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl text-white">Sign in to your account</CardTitle>
              <CardDescription className="text-gray-400">Enter your credentials to access the dashboard</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit((data: any) => onSubmit(data, () => console.log("Login successful!")))}>
              <CardContent className="space-y-4">
                {errors.root && (
                    <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">
                      {errors.root.message}
                    </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@clinic.com"
                        className="border-gray-800 bg-gray-800 pl-10 text-white placeholder:text-gray-500"
                        {...register('email')}
                    />
                  </div>
                  {errors.email && (
                      <p className="text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="border-gray-800 bg-gray-800 pl-10 text-white placeholder:text-gray-500"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-400"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                      <p className="text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                      id="remember"
                      className="border-gray-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      {...register('rememberMe')}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-300">
                    Remember me for 30 days
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <p className="text-center text-sm text-gray-400">
                  Don't have an account?
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
  )
}