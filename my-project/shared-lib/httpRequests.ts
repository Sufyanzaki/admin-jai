import { fetchExtra } from "@/shared-lib/fetchExtra";

type postRequestDto<T> = {
    url: string;
    data: T;
    useAuth?: boolean;
    otherHeaders?: Record<string, string>;
};

export async function postRequest<T>({
    url,
    data,
    useAuth = false,
    otherHeaders = {},
}: postRequestDto<T>) {
    return (
        await fetchExtra(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...otherHeaders,
                },
                body: JSON.stringify({ ...data }),
            },
            useAuth
        )
    );
}

type patchRequestDto<T> = {
    url: string;
    data: T;
    useAuth?: boolean;
    otherHeaders?: Record<string, string>;
};

export async function patchRequest<T>({
    url,
    data,
    otherHeaders = {},
    useAuth = false,
}: patchRequestDto<T>) {
    return await fetchExtra(
        url,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...otherHeaders,
            },
            body: JSON.stringify({
                ...data,
            }),
        },
        useAuth
    );
}

type getRequestDto = {
    url: string;
    useAuth?: boolean;
    otherHeaders?: Record<string, string>;
    params?: Record<string, any>;
};

export async function getRequest<T>({
    url,
    useAuth = false,
    otherHeaders = {},
    params = {},
}: getRequestDto): Promise<T> {

    const queryString = Object.keys(params).length
        ? "?" + new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                if (value !== undefined && value !== null) {
                    acc[key] = String(value);
                }
                return acc;
            }, {} as Record<string, string>)
        ).toString()
        : "";

    const finalUrl = `${url}${queryString}`;

    return (
        await fetchExtra(
            finalUrl,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...otherHeaders,
                },
            },
            useAuth
        )
    ).response as T;
}

type deleteRequestDto = {
    url: string;
    useAuth?: boolean;
    otherHeaders?: Record<string, string>;
};

export async function deleteRequest({
    url,
    useAuth = false,
    otherHeaders = {},
}: deleteRequestDto) {
    return await fetchExtra(
        url,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...otherHeaders,
            },
        },
        useAuth
    );
}