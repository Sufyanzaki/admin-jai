"use client";

import type React from "react";
import {Button} from "@/components/client/ux/button";
import {Input} from "@/components/client/ux/input";
import {Label} from "@/components/client/ux/label";
import useLoginForm from "../_hooks/useLoginForm";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
      isSubmitting
  } = useLoginForm();

  return (
      <form
          onSubmit={handleSubmit(data=>onSubmit(data))}
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

          <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              variant="theme"
              className="w-full"
          >
              {isSubmitting ? "Processing..." : "Login"}
          </Button>
      </form>
  );
}
