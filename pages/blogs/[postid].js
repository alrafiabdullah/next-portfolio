import Link from "next/link";
import { useState } from "react";
import { HashLoader } from "react-spinners";

const BlogPost = ({ post }) => {
    const [loading, setLoading] = useState(false);

    const backButtonClickHandler = () => {
        setLoading(true);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Blog Title: {post.title.S}</h1>
            <p style={{ border: "1px solid black", padding: "20px", marginRight: "100px", marginLeft: "100px" }}>{post.content.S}</p>
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
    console.log(context);
    const { postid } = context.params;

    let url = "http://127.0.0.1:3000";
    if (process.env.NODE_ENV === "production") {
        url = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
    }

    const res = await fetch(`${url}/api/posts/${postid}`);
    const post = await res.json();

    return {
        props: {
            post,
        },

        revalidate: 10,
    };
};

export const getStaticPaths = async () => {
    let url = "http://127.0.0.1:3000";
    if (process.env.NODE_ENV === "production") {
        url = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
    }

    const res = await fetch(`${url}/api/posts`);
    const posts = await res.json();

    const paths = posts.map((post) => ({
        params: { postid: post.id.N },
    }));

    return {
        paths,
        fallback: false,
    };
};


export default BlogPost;