"use client";

import type React from "react";
import {Button} from "@/components/client/ux/button";
import {Input} from "@/components/client/ux/input";
import {Label} from "@/components/client/ux/label";
import Link from "next/link";
import useLoginForm from "../_hooks/useLoginForm";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = useLoginForm();

  return (
    <div className="space-y-6 w-full">
      <div className="text-start space-y-2">
        <h3 className="text-[22px] lg:text-[26px] font-bold">Login</h3>
      </div>

      <form
        onSubmit={handleSubmit((data: any) =>
          onSubmit(data, () => console.log("Login successful!"))
        )}
        className="space-y-6"
      >
        <div className="">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@email.com"
            {...register("email")}
            className="h-12"
            required
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Choose password"
            className="h-12"
            required
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <Link href={"/dashboard"}>
          <Button
            type="submit"
            size="lg"
            variant="theme"
            className="w-full"
            // disabled={!acceptTerms}
          >
            Login
          </Button>
        </Link>
      </form>

      <p className="text-sm text-end mt-8 mb-12 lg:mb-0">
        <a
          href="/forgot-password"
          className="text-gray-500 hover:text-gray-700 hover:underline"
        >
          Forgot your password?
        </a>
      </p>
    </div>
  );
}
