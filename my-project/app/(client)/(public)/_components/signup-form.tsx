"use client";

import { Button } from "@/components/client/ux/button";
import { Card, CardContent, CardHeader } from "@/components/client/ux/card";
import { FacebookIcon, GoogleIcon } from "@/lib/icons";
import { Container } from "@/components/client/ux/container";
import DesktopForm from "@/app/(client)/(public)/_components/desktop-form";
import TabletForm from "@/app/(client)/(public)/_components/tablet-form";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";

export function SignupForm() {
  const { t } = useTranslation();

  return (
      <>
        {/* Desktop version */}
        <div className="lg:block hidden">
          <Card className="w-full rounded-none lg:rounded-[5px] lg:max-w-md bg-white px-0 pt-1 pb-8 md:py-8 md:px-2 lg:p-1">
            <CardHeader className="grid grid-cols-2 gap-4">
              <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <div className="flex items-center justify-center space-x-2">
                  <GoogleIcon className="w-6 h-6" />
                  <span className="font-light">{t("Register")}</span>
                </div>
              </Button>

              <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => signIn("facebook", { callbackUrl: "/" })}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FacebookIcon className="w-6 h-6" />
                  <span className="font-light">{t("Register")}</span>
                </div>
              </Button>
            </CardHeader>
            <CardContent>
              <DesktopForm />
              <p className="w-full text-[#919ba4] text-[12px] font-light leading-[20px]">
                {t(
                    "By choosing Register, you agree to our terms of use (including mandatory arbitration of disputes) and confirm that you have understood our privacy statement."
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile version */}
        <div className="block lg:hidden w-full bg-white pt-6 pb-8 md:py-8">
          <Container className="px-4 md:px-6">
            <div className="w-full rounded-none">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <Button variant="outline" size="lg" className="w-full">
                  <div className="flex items-center justify-center space-x-2">
                    <GoogleIcon className="w-6 h-6" />
                    <span className="font-light">{t("Register")}</span>
                  </div>
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <div className="flex items-center justify-center space-x-2">
                    <FacebookIcon className="w-6 h-6" />
                    <span className="font-light">{t("Register")}</span>
                  </div>
                </Button>
              </div>

              <div className="space-y-4">
                <TabletForm />
                <p className="w-full text-[#919ba4] text-[12px] font-light leading-[20px]">
                  {t(
                      "By choosing Register, you agree to our terms of use (including mandatory dispute arbitration) and have understood our privacy policy."
                  )}
                </p>
              </div>
            </div>
          </Container>
        </div>
      </>
  );
}
