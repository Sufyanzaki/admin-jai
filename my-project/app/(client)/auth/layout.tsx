"use client";

import { Container } from "@/components/client/ux/container";
import ImageWrapper from "@/components/client/image-wrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  return (
    <div className="">
      <div className="hidden overflow-y-hidden h-screen w-full lg:flex flex-row ">
        <div className="h-screen w-[31%]">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(/assets/login-couple.png)` }}
          ></div>
        </div>

        <div className="w-full lg:w-[69%] flex flex-col ">
          <div className="scrollbar-hide flex-1 overflow-y-auto">
            <div className="flex justify-between items-center px-4 py-6 lg:px-14 lg:py-7">
              <div className="text-2xl font-bold">
                <Link href={"/"}>
                  <ImageWrapper
                    width={200}
                    height={200}
                    src="/logo-black.png"
                    alt="humsafar"
                  />
                </Link>
              </div>
              {pathname === "/auth/login" ? (
                <div className=" text-black text-md">
                  Don&apos;t have an account?
                  <a
                    href="/auth/profile/create"
                    className="ml-1 hover:underline font-medium"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <div className=" text-black text-md">
                  Do you have an account?
                  <a
                    href="/auth/login"
                    className="ml-1 hover:underline font-medium"
                  >
                    Login
                  </a>
                </div>
              )}
            </div>
            <div className="w-full mx-auto mt-10 overflow-auto ">
              <Container size={"default"} className="">
                {children}
              </Container>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full flex lg:hidden flex-col ">
        {/* Left Image Side */}
        <div className="text-2xl font-bold h-[78px] flex items-center justify-start px-4">
          <Link href={"/"}>
            <ImageWrapper
              width={170}
              height={170}
              src="/logo-black.png"
              alt="humsafar"
            />
          </Link>
        </div>
        <div className="h-[272px] w-full">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(/assets/login-couple-mobile.png)` }}
          ></div>
        </div>

        <div className="w-full flex flex-col">
          {pathname === "/admin/auth/login" && (
            <div className=" text-black text-md text-center w-full mt-7">
              Don&apos;t have an account?
              <a
                href="/auth/profile/create"
                className="ml-1 hover:underline font-medium"
              >
                Register
              </a>
            </div>
          )}
          <div className="w-full max-w-full mt-6 mx-auto overflow-auto">
            <Container>{children}</Container>
          </div>
        </div>
      </div>
    </div>
  );
}
