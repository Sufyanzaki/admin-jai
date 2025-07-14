import { uploadDocument } from "@/admin-utils/utils/uploadDocument";

export async function imageUpload(file: File): Promise<string> {
    const fileType = file.name.split('.').pop()?.toLowerCase() || '';
    const { url: presignedUrl, path: filePath } = await uploadDocument({
        name: file.name,
        type: fileType
    });

    const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
            "x-amz-acl": "public-read"
        },
        body: file
    });

    if (!response.ok) {
        throw new Error('Image upload failed');
    }

    return filePath;
}