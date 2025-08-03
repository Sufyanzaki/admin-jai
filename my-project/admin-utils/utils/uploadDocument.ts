type DocumentDto = {
    name: string;
    type: string;
};

const BASE_URL = "https://sea-lion-app-jeef5.ondigitalocean.app/api/v1/";

export async function uploadDocument({ name, type }: DocumentDto): Promise<{ url: string; path: string }> {
    const res = await fetch(
        `${BASE_URL}upload/images/${name}?type=${type}&mediaType=documents`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        }
    );
    if (!res.ok) {
        throw new Error("Failed to upload document");
    }
    return res.json();
}
