"use client";

import { Button } from "@/components/client/ux/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import { Card, CardHeader, CardContent } from "@/components/client/ux/card";
import { Label } from "@/components/client/ux/label";
import { FacebookIcon, GoogleIcon } from "@/lib/icons";
import { Container } from "@/components/client/ux/container";
import LocationSearchInput from "@/components/client/location-search";
import { Input } from "@/components/client/ux/input";
import useRegisterForm from "@/app/(client)/auth/profile/_hooks/useRegisterForm";
import { Controller } from "react-hook-form";
import { MemberLocation } from "@/app/shared-types/member";

export function SignupForm() {
  const {
    errors,
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    register,
    setValue,
    watch,
  } = useRegisterForm();

  const city = watch("city");
  const state = watch("state");
  const country = watch("country");

  const currentLocation =
    city || state || country ? { city, state, country } : null;

  const handleLocationSelect = (location: Partial<MemberLocation>) => {
    setValue("city", location.city);
    setValue("state", location.state);
    setValue("country", location.country);
  };

  return (
    <>
      {/* Desktop version */}
      <div className="lg:block hidden">
        <Card className="w-full rounded-none lg:rounded-[5px] lg:max-w-md bg-white px-0 pt-1 pb-8 md:py-8 md:px-2 lg:p-1">
          <CardHeader className="grid grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="w-full">
              <div className="flex items-center justify-center space-x-2">
                <GoogleIcon className="w-6 h-6" />
                <span className="font-light">Register</span>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <div className="flex items-center justify-center space-x-2">
                <FacebookIcon className="w-6 h-6" />
                <span className="font-light">Register</span>
              </div>
            </Button>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(data=>onSubmit(data))} className="space-y-5">
              <div className="border-b border-[#E5E7EB]">
                <Controller
                  name="lookingFor"
                  control={control}
                  render={({ field }) => (
                    <Select
                      key="lookingFor"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger
                        id="looking-for"
                        className="border-none h-12 pl-0 items-end"
                      >
                        <SelectValue placeholder="What are you looking for?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relationship">
                          Relationship
                        </SelectItem>
                        <SelectItem value="friendship">Friendship</SelectItem>
                        <SelectItem value="casual">Casual Dating</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.lookingFor && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.lookingFor.message}
                  </p>
                )}
              </div>

              {/* Age Range */}
              <div className="flex flex-row gap-4 w-full justify-center">
                <div className="flex flex-row gap-2 justify-between items-end w-full">
                  <Label className="text-base font-normal text-[#374151] mb-0">
                    Between
                  </Label>
                  <div className="border-b border-[#E5E7EB] w-full">
                    <Controller
                      name="ageFrom"
                      control={control}
                      render={({ field }) => (
                        <Select
                          key="ageFrom"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            id="between"
                            className="border-none h-12 items-end"
                          >
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="18">18</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="35">35</SelectItem>
                            <SelectItem value="45">45</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.ageFrom && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.ageFrom.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-row gap-2 justify-between items-end w-full">
                  <Label className="text-base font-normal text-[#374151] mb-0">
                    and
                  </Label>
                  <div className="border-b border-[#E5E7EB] w-full">
                    <Controller
                      name="ageTo"
                      control={control}
                      render={({ field }) => (
                        <Select
                          key="ageTo"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            id="and"
                            className="border-none h-12 items-end"
                          >
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="35">35</SelectItem>
                            <SelectItem value="45">45</SelectItem>
                            <SelectItem value="99">99+</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.ageTo && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.ageTo.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2 border-b border-[#E5E7EB]">
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <LocationSearchInput
                      key="location-desktop"
                      value={{
                        city: field.value,
                        state: watch("state"),
                        country: watch("country"),
                      }}
                      onSelect={(location: Partial<MemberLocation>) => {
                        field.onChange(location.city ?? "");
                        setValue("state", location.state ?? "");
                        setValue("country", location.country ?? "");
                      }}
                      placeholder="Search for your city, state, or country"
                    />
                  )}
                />
                {errors.city && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Email & Password */}
              <div className="flex flex-row gap-4">
                <div className="w-1/2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="theme"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
            <p className="w-full text-[#919ba4] text-[12px] font-light leading-[20px]">
              By choosing Register, you agree to our terms of use (including
              mandatory arbitration of disputes) and confirm that you have
              understood our privacy statement.
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
                  <span className="font-light">Register</span>
                </div>
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <div className="flex items-center justify-center space-x-2">
                  <FacebookIcon className="w-6 h-6" />
                  <span className="font-light">Register</span>
                </div>
              </Button>
            </div>

            <div className="space-y-4">
              <form
                onSubmit={handleSubmit((data) => onSubmit(data))}
                className="space-y-5"
              >
                <div className="border-b border-[#E5E7EB]">
                  <Controller
                    name="lookingFor"
                    control={control}
                    render={({ field }) => (
                      <Select
                        key="lookingFor-mobile"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="border-none h-12 pl-0">
                          <SelectValue placeholder="What are you looking for?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relationship">
                            Relationship
                          </SelectItem>
                          <SelectItem value="friendship">Friendship</SelectItem>
                          <SelectItem value="casual">Casual Dating</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.lookingFor && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.lookingFor.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-row gap-4 w-full justify-center">
                  <div className="flex flex-row gap-2 items-end w-full">
                    <Label className="text-base font-normal text-[#374151]">
                      Between
                    </Label>
                    <div className="border-b border-[#E5E7EB] w-full">
                      <Controller
                        name="ageFrom"
                        control={control}
                        render={({ field }) => (
                          <Select
                            key="ageFrom"
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="border-none h-12">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="18">18</SelectItem>
                              <SelectItem value="25">25</SelectItem>
                              <SelectItem value="35">35</SelectItem>
                              <SelectItem value="45">45</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.ageFrom && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.ageFrom.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 items-end w-full">
                    <Label className="text-base font-normal text-[#374151]">
                      and
                    </Label>
                    <div className="border-b border-[#E5E7EB] w-full">
                      <Controller
                        name="ageTo"
                        control={control}
                        render={({ field }) => (
                          <Select
                            key="ageTo"
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="border-none h-12">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="25">25</SelectItem>
                              <SelectItem value="35">35</SelectItem>
                              <SelectItem value="45">45</SelectItem>
                              <SelectItem value="99">99+</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.ageTo && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.ageTo.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border-b border-[#E5E7EB]">
                  <LocationSearchInput
                    value={currentLocation}
                    onSelect={handleLocationSelect}
                    placeholder="Search for your city, state, or country"
                  />
                  {(errors.city || errors.state || errors.country) && (
                    <div className="space-y-1">
                      {errors.city && (
                        <p className="text-sm text-red-500">
                          {errors.city.message}
                        </p>
                      )}
                      {errors.state && (
                        <p className="text-sm text-red-500">
                          {errors.state.message}
                        </p>
                      )}
                      {errors.country && (
                        <p className="text-sm text-red-500">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-row gap-4">
                  <div className="w-1/2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="w-1/2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="theme"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </form>
              <p className="w-full text-[#919ba4] text-[12px] font-light leading-[20px]">
                By choosing Register, you agree to our terms of use (including
                mandatory dispute arbitration) and have understood our privacy
                policy.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
