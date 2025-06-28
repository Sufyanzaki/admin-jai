"use client"

import {useState, useRef, FormEvent} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", ""])
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const enteredOtp = otp.join("")
    console.log("Entered OTP:", enteredOtp)
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img
                src="https://ticketprijs.nl/admin/logoImages/1730182765_logo%20(1).png"
                alt="Logo"
                className="mx-auto"
            />
          </div>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl text-white">Verify OTP</CardTitle>
              <CardDescription className="text-gray-400">
                Enter the 4-digit code sent to your email
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                      <Input
                          key={index}
                          ref={(el) => {
                            inputsRef.current[index] = el
                          }}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="h-10 w-10 text-center text-xl bg-gray-800 text-white border-gray-700 focus-visible:ring-blue-600"
                      />
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Verify
                </Button>
                <p className="text-center text-sm text-gray-400">Didn't receive code? <span className="underline cursor-pointer">Resend</span></p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
  )
}
