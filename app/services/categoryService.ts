import apiClient from "@/app/lib/apiClient";

export interface Category {
  name: string;
  href: string;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let cachedCategories: Category[] | null = null;
let cacheTimestamp = 0;

export async function getCategories(): Promise<Category[]> {
  const now = Date.now();
  if (cachedCategories && now - cacheTimestamp < CACHE_TTL) {
    return cachedCategories;
  }

  const { data } = await apiClient.get<Category[]>("/blog/category");
  cachedCategories = data;
  cacheTimestamp = now;
  return data;
}
