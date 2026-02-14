import apiClient from "@/app/lib/apiClient";
import { BlogResponse } from "./blogService";

export interface TagData {
  id: number;
  name: string;
  added_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: string;
  href: string;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let cachedTags: Tag[] | null = null;
let cacheTimestamp = 0;

function modifyTagName(tagData: TagData): Tag {
  const tagName = tagData.name;
  // Example modification: Convert to uppercase and replace spaces and underscores with dashes
  const hrefVal = `/category/${tagName.toLowerCase().replace(/[_\s]+/g, "-")}`;
  const displayName = tagName.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { id: tagData.id, name: displayName, href: hrefVal };
}

export async function getTags(tagCount: number = -1): Promise<Tag[]> {
  const now = Date.now();
  if (cachedTags && now - cacheTimestamp < CACHE_TTL) {
    return cachedTags;
  }

  const { data } = await apiClient.get<TagData[]>(`/blog/tags?tag_count=${tagCount}`);
  const modifiedTags = data.map((tag) => modifyTagName(tag));
  cachedTags = modifiedTags;
  cacheTimestamp = now;
  return modifiedTags;
}

export async function getBlogsByTag(tagName: string): Promise<BlogResponse[]> {
  const { data } = await apiClient.get<BlogResponse[]>(`/blog/tags?tag_name=${tagName}`);
  return data;
}