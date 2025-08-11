import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {PackageDto} from "@/app/shared-types/packages";

type Payload = Partial<PackageDto>;

export async function addPackage(payload: Payload) {
    return postRequest<Payload>({
        url: "package",
        data: payload,
        useAuth: true,
    });
}

export async function editPackage(payload: Payload) {
    const { id, ...data } = payload;
    return patchRequest<Payload>({
        url: `package/${id}`,
        data,
        useAuth: true,
    });
}

export async function getAllPackages(): Promise<PackageDto[]> {
    return getRequest<PackageDto[]>({
        url: "package",
        useAuth: true,
    });
}

export async function patchPackage({ id, isActive }: Payload) {
    return patchRequest({
        url: `package/${id}`,
        data: { isActive },
        useAuth: true,
    });
}

export async function getPackageById(id: number | string): Promise<PackageDto> {
    return getRequest<PackageDto>({
        url: `package/${id}`,
        useAuth: true,
    });
}