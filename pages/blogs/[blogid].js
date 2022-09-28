import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { HashLoader } from "react-spinners";

const BlogPost = ({ post }) => {
    const [loading, setLoading] = useState(false);

    const backButtonClickHandler = () => {
        setLoading(true);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Blog Title: {post.data.title}</h1>
            <p style={{ border: "1px solid black", padding: "20px", marginRight: "100px", marginLeft: "100px" }}>{post.data.content}</p>
            <div style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
            }}>
                <HashLoader loading={loading} color="red" />
            </div>
            <Link href="/blogs"><button onClick={backButtonClickHandler}>Back to Blogs</button></Link>
        </div>
    );
};

export const getStaticProps = async (context) => {
    const { blogid } = context.params;

    // split string by - and take the last item
    const id = blogid.split("-").pop();

    let url = process.env.NEXT_PUBLIC_LOCAL_URL;
    if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_PROD_URL;
    }

    const res = await fetch(`${url}/api/posts/${id}`);
    const post = await res.json();

    return {
        props: {
            post: post,
            title: post.data.title,
        },

        revalidate: 10,
    };
};

export const getStaticPaths = async () => {
    let url = process.env.NEXT_PUBLIC_LOCAL_URL;
    if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_PROD_URL;
    }

    const res = await fetch(`${url}/api/posts`);
    const posts = await res.json();

    const paths = posts.map((post) => ({
        params: { blogid: `${post.data.slug}-${post.id}` },
    }));

    return {
        paths,
        fallback: false,
    };
};


export default BlogPost;