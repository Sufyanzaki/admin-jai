export type BlogDto = {
  id: string;
  title: string;
  slug: string;
  categoryId: number;
  bannerImage: string;
  shortDescription: string;
  description: string;
  isActive: boolean;
  metaTitle: string;
  metaImage: string;
  metaDescription: string;
  metaKeywords: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryDto = {
  id: number;
  name: string;
  blogs: BlogDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type BlogApiResponse = {
  categories: {
    stats: {
      totalBlogs: number;
      activeBlogs: number;
      inactiveBlogs: number;
    };
    categoryNames: string[];
    categories: CategoryDto[];
  };
};