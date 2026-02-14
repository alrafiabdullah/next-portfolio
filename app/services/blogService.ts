import apiClient from "@/app/lib/apiClient";

export type BlogIsDraft = true | false;

export interface BlogPayload {
  title: string;
  cover_image?: string;
  content_html: string;
  content_json: object;
  is_draft: BlogIsDraft;
  tags: number[];
}

export interface UserResponse {
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
}

export interface BlogResponse {
  id: string;
  title: string;
  cover_image_url?: string;
  content_html: string;
  content_json: object;
  is_draft: BlogIsDraft;
  written_by: UserResponse;
  slug: string;
  tags: number[];
  published_at: string;
  updated_at: string;
}

export async function createBlog(payload: BlogPayload): Promise<BlogResponse> {
  const body = { ...payload, written_by: "abdullah" }; // Hardcoded for now
  const { data } = await apiClient.post<BlogResponse>("/blog/", body);
  return data;
}

export async function getBlog(id: string): Promise<BlogResponse> {
  const { data } = await apiClient.get<BlogResponse>(`/blog/?blog_id=${id}`);
  return data;
}

export async function getBlogs(): Promise<BlogResponse[]> {
  const { data } = await apiClient.get<BlogResponse[]>("/blog/");
  return data;
}
