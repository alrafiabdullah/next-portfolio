
import { notFound } from "next/navigation";
import { getTags, getBlogsByTag } from "@/app/services/tagService";
import BlogCard from "@/app/components/BlogComponent/BlogCard";

interface CategoryPageProps {
    params: Promise<{
        categoryName: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { categoryName } = await params;

    if (!categoryName) {
        notFound();
    }

    let showCategoryName = categoryName.replace(/-/g, " ");
    let cleanedCategoryTag = categoryName.replace(/-/g, "_").toLowerCase();


    const blogs = await getBlogsByTag(cleanedCategoryTag);

    return (
        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8">
            <h1
                className="mb-6 text-3xl font-bold capitalize"
                style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}
            >
                {showCategoryName} Posts
            </h1>

            {blogs.length === 0 ? (
                <p style={{ color: "var(--color-text-secondary)" }}>
                    No blog posts found for {showCategoryName}.
                </p>
            ) : (
                <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </main>
    );
}
