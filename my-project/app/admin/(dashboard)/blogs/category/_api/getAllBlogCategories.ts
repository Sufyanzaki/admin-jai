import { getRequest } from "@/shared-lib";
import { BlogCategoryList } from "../_types/category-types";

export async function getAllBlogCategories(): Promise<BlogCategoryList> {
    return await getRequest<BlogCategoryList>({
        url: 'blog/categories',
        useAuth: true
    });
}
