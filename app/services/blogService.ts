import apiClient from "@/app/lib/apiClient";

export type BlogIsDraft = true | false;

export interface BlogPayload {
  title: string;
  content_html: string;
  content_json: object;
  is_draft: BlogIsDraft;
  tags: number[];
}

export interface BlogResponse {
  id: number;
  title: string;
  content_html: string;
  content_json: object;
  is_draft: BlogIsDraft;
  tags: number[];
  created_at: string;
  updated_at: string;
}

export async function createBlog(payload: BlogPayload): Promise<BlogResponse> {
    console.log("Creating blog with payload:", payload); // Debug log
  const { data } = await apiClient.post<BlogResponse>("/blog/posts/", payload);
  return data;
}
