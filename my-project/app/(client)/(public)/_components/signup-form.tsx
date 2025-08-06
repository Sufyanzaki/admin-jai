"use client";

import { Button } from "@/components/client/ux/button";
import { Card, CardContent, CardHeader } from "@/components/client/ux/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import { Label } from "@/components/client/ux/label";
import { FacebookIcon, GoogleIcon } from "@/lib/icons";
import Link from "next/link";
import { Container } from "@/components/client/ux/container";
import LocationSearchInput from "@/components/client/location-search";
import { Input } from "@/components/client/ux/input";

export function SignupForm() {

  return (
    <>
      <div className="lg:block hidden">
        <Card className="w-full rounded-none lg:rounded-[5px] lg:max-w-md lg:max-h-[440px] bg-white px-0 pt-1 pb-8 md:py-8 md:px-2 lg:p-1">
          <CardHeader className="grid grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="w-full">
              <div className="flex items-center justify-center space-x-2">
                <GoogleIcon className="w-6 h-6" />
                <span className="font-light">Registreer</span>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <div className="flex items-center justify-center space-x-2">
                <FacebookIcon className="w-6 h-6" />
                <span className="font-light">Registreer</span>
              </div>
            </Button>
          </CardHeader>

          <CardContent>
            <form className="space-y-5">
              <div className="border-b border-[#E5E7EB]">
                <Select>
                  <SelectTrigger
                    id="looking-for"
                    className="border-none h-12 pl-0 items-end"
                  >
                    <SelectValue placeholder="What are you looking for?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relationship">Relationship</SelectItem>
                    <SelectItem value="friendship">Friendship</SelectItem>
                    <SelectItem value="casual">Casual Dating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-row gap-4 w-full justify-center">
                <div className="flex flex-row gap-2 justify-between items-end w-full">
                  <Label
                    htmlFor="and"
                    className="text-base font-normal text-[#374151] mb-0"
                  >
                    Between
                  </Label>
                  <div className="border-b border-[#E5E7EB] w-full ">
                    <Select>
                      <SelectTrigger
                        id="between"
                        className="border-none h-12 items-end"
                      >
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-25">18-25</SelectItem>
                        <SelectItem value="26-35">26-35</SelectItem>
                        <SelectItem value="36-45">36-45</SelectItem>
                        <SelectItem value="46+">46+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-row gap-2 justify-between items-end w-full">
                  <Label
                    htmlFor="and"
                    className="text-base font-normal text-[#374151] mb-0"
                  >
                    and
                  </Label>
                  <div className="border-b border-[#E5E7EB] w-full">
                    <Select>
                      <SelectTrigger
                        id="and"
                        className="border-none h-12 items-end"
                      >
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-25">18-25</SelectItem>
                        <SelectItem value="26-35">26-35</SelectItem>
                        <SelectItem value="36-45">36-45</SelectItem>
                        <SelectItem value="46+">46+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-b border-[#E5E7EB]">
                <LocationSearchInput
                  onSelect={(location) => {
                    console.log("Selected location:", location);
                  }}
                />
              </div>

              <div className="flex flex-row gap-4">
                <div className="w-1/2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                  />
                  {/*{errors.email && (*/}
                  {/*    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>*/}
                  {/*)}*/}
                </div>

                <div className="w-1/2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                  />
                  {/*{errors.password && (*/}
                  {/*    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>*/}
                  {/*)}*/}
                </div>
              </div>

              <Button variant="theme" size="lg" asChild className="w-full">
                <Link href="#">Register</Link>
              </Button>
            </form>
            <p className="w-full text-[#919ba4] text-[12px] font-light leading-[20px]">
              Door &quot;Registreren&quot; te kiezen, ga je akkoord met onze
              gebruiksvoorwaarden (inclusief de verplichte arbitrage van
              geschillen) en heb je onze privacyverklaring begrepen.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="block lg:hidden w-full bg-white pt-6 pb-8 md:py-8">
        <Container className="px-4 md:px-6">
          <div className="w-full rounded-none">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <Button variant="outline" size="lg" className="w-full">
                <div className="flex items-center justify-center space-x-2">
                  <GoogleIcon className="w-6 h-6" />
                  <span className="font-light">Registreer</span>
                </div>
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <div className="flex items-center justify-center space-x-2">
                  <FacebookIcon className="w-6 h-6" />
                  <span className="font-light">Registreer</span>
                </div>
              </Button>
            </div>

            <div className="space-y-4">
              <form className="space-y-5">
                <div className="border-b border-[#E5E7EB]">
                  <Select>
                    <SelectTrigger
                      id="looking-for"
                      className="border-none h-12 pl-0"
                    >
                      <SelectValue placeholder="What are you looking for?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relationship">Relationship</SelectItem>
                      <SelectItem value="friendship">Friendship</SelectItem>
                      <SelectItem value="casual">Casual Dating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-row gap-4 w-full justify-center">
                  <div className="flex flex-row gap-2 justify-between items-end w-full">
                    <Label
                      htmlFor="and"
                      className="text-base font-normal text-[#374151]"
                    >
                      Between
                    </Label>
                    <div className="border-b border-[#E5E7EB] w-full ">
                      <Select>
                        <SelectTrigger
                          id="between"
                          className="border-none h-12"
                        >
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-25">18-25</SelectItem>
                          <SelectItem value="26-35">26-35</SelectItem>
                          <SelectItem value="36-45">36-45</SelectItem>
                          <SelectItem value="46+">46+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-end w-full">
                    <Label
                      htmlFor="and"
                      className="text-base font-normal text-[#374151]"
                    >
                      and
                    </Label>
                    <div className="border-b border-[#E5E7EB] w-full">
                      <Select>
                        <SelectTrigger id="and" className="border-none h-12">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-25">18-25</SelectItem>
                          <SelectItem value="26-35">26-35</SelectItem>
                          <SelectItem value="36-45">36-45</SelectItem>
                          <SelectItem value="46+">46+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border-b border-[#E5E7EB]">
                  <LocationSearchInput
                    onSelect={(location) => {
                      console.log("Selected location:", location);
                    }}
                  />
                </div>

                <Button
                  variant="theme"
                  size="lg"
                  asChild
                  className="w-full my-1"
                >
                  <Link href="#">Register</Link>
                </Button>
              </form>
              <p className="w-full text-[#919ba4] text-[12px] font-light leading-[20px]">
                Door &quot;Registreren&quot; te kiezen, ga je akkoord met onze
                gebruiksvoorwaarden (inclusief de verplichte arbitrage van
                geschillen) en heb je onze privacyverklaring begrepen.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
