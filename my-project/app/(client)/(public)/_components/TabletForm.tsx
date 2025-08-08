"use client"

import {Controller} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";
import {Label} from "@/components/client/ux/label";
import LocationSearchInput from "@/components/client/location-search";
import {Input} from "@/components/client/ux/input";
import {Button} from "@/components/client/ux/button";
import useRegisterForm from "@/app/(client)/auth/profile/_hooks/useRegisterForm";
import {MemberLocation} from "@/app/shared-types/member";

export default function TabletForm(){
    const {
        errors,
        isLoading,
        onSubmit,
        handleSubmit,
        control,
        register,
        setValue,
        watch,
        currentStep
    } = useRegisterForm();

    const city = watch("city");
    const state = watch("state");
    const country = watch("country");

    const currentLocation =
        city || state || country ? { city, state, country } : null;

    const handleLocationSelect = (location: Partial<MemberLocation>) => {
        setValue("city", location.city);
        location.state && setValue("state", location.state);
        location.country && setValue("country", location.country);
    };

    return (
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
                                <SelectItem value="Man">Man</SelectItem>
                                <SelectItem value="Woman">Woman</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
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
                                    key={field.value}
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
                                    key={field.value}
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
                {(errors.state || errors.country) && (
                    <div className="space-y-1">
                        {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                        {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
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
                {isLoading ? currentStep : "Register"}
            </Button>
        </form>
    )
}