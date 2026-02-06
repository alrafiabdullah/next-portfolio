'use server';

import { v2 as cloudinary } from 'cloudinary';

const MAX_FILE_SIZE_MB = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB) || 10;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
});

export async function uploadBlogImage(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file) throw new Error('No file uploaded');
  if (file.size > MAX_FILE_SIZE) throw new Error(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'blog_media',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!.secure_url);
        }
      )
      .end(buffer);
  });
}
