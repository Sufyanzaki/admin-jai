import {getRequest} from "@/admin-utils";

type DocumentDto = {
    name: string;
    type: string;
};

export async function uploadDocument({name, type} : DocumentDto) : Promise<{ url: string, path: string }> {
    return await getRequest({
        url: `upload/images/${name}?type=${type}&mediaType=documents`,
        useAuth: true
    })
}