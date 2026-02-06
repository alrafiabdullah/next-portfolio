import apiClient from "@/app/lib/apiClient";

export interface Category {
  name: string;
  href: string;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/blog/tagss");
  return data;
}
