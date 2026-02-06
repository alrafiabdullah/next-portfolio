import apiClient from "@/app/lib/apiClient";

export interface Tag {
  id: number;
  name: string;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let cachedTags: Tag[] | null = null;
let cacheTimestamp = 0;

export async function getTags(): Promise<Tag[]> {
  const now = Date.now();
  if (cachedTags && now - cacheTimestamp < CACHE_TTL) {
    return cachedTags;
  }

  const { data } = await apiClient.get<Tag[]>("/blog/tags");
  cachedTags = data;
  cacheTimestamp = now;
  return data;
}
