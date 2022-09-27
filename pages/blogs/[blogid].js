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

    let url = process.env.NEXT_PUBLIC_LOCAL_URL;
    if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_PROD_URL;
    }

    const res = await fetch(`${url}/api/posts/${blogid}`);
    const post = await res.json();

    return {
        props: {
            post,
        },

        revalidate: 10,
    };
};

export const getStaticPaths = async () => {
    let url = process.env.NEXT_PUBLIC_LOCAL_URL;
    if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_PROD_URL;
    }

    console.log(url);
    console.log(process.env.NODE_ENV);

    const res = await fetch(`${url}/api/posts`);
    const posts = await res.json();

    console.log(posts);

    const paths = posts.map((post) => ({
        params: { blogid: post.id },
    }));

    console.log(paths);

    return {
        paths,
        fallback: false,
    };
};


export default BlogPost;