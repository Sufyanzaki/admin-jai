import { fetchExtra } from "@/admin-utils";

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
};

export async function getRequest<T>({
                                        url,
                                        useAuth = false,
                                        otherHeaders = {},
                                    }: getRequestDto): Promise<T> {
    return (
        await fetchExtra(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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