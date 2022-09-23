import { useState } from "react";
import Link from "next/link";
import { HashLoader } from "react-spinners";
import axios from "axios";

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
    const { blogID } = context.params;

    const res = await axios.get(`${process.env.PROD_URL}/api/posts/${blogID}`);
    const post = await res.data;

    return {
        props: {
            post,
        },
        revalidate: 10,
    };
};

export const getStaticPaths = async () => {
    const res = await axios.get(`${process.env.PROD_URL}/api/posts`);
    const posts = await res.data;

    const paths = posts.map((post) => ({
        params: { blogID: post.id.N },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default BlogPost;

