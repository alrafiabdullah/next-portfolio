import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiLike, BiDislike } from "react-icons/bi";
import { HashLoader } from "react-spinners";

const BlogPosts = ({ posts }) => {
    const [loading, setLoading] = useState(false);

    const likeClickHandler = (title) => {
        toast.success(`You liked ${title}`, {
            icon: <BiLike />,
            style: {
                border: "1px solid #713200",
                // padding: "16px",
                color: "green",
            },
        });
    };

    const unLikeClickHandler = (title) => {
        toast.success(`You unliked ${title}`, {
            icon: <BiDislike />,
            style: {
                border: "1px solid #713200",
                // padding: "16px",
                color: "red",
            },
        });
    };

    const titleClickHandler = () => {
        setLoading(true);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Toaster />
            <h3>Blogs By Abdullah Al Rafi</h3>
            <Link href="/"><button>Home</button></Link>
            <div style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
            }}>
                <HashLoader loading={loading} color="red" />
            </div>
            <hr />
            {posts.map((post, index) =>
                <div key={index}>
                    <Link href={`/blogs/${post.data.slug}-${post.id}`}>
                        <h1 style={{ cursor: "pointer" }} onClick={titleClickHandler}>{post.data.title}</h1>
                    </Link>
                    <p>{post.data.content}</p>
                    <span><BiLike style={{ color: "blue", cursor: "pointer" }} onClick={() => likeClickHandler(post.data.title)} /> <BiDislike style={{ color: "red", cursor: "pointer" }} onClick={() => unLikeClickHandler(post.data.title)} /></span>
                    <hr />
                </div>
            )}
        </div >
    );
};

export const getStaticProps = async () => {
    let url = process.env.NEXT_PUBLIC_LOCAL_URL;
    if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_PROD_URL;
    }

    const res = await fetch(`${url}/api/posts`);
    const posts = await res.json();

    return {
        props: {
            posts: posts,
            title: "Blogs",
        },
        revalidate: 10,
    };
};

export default BlogPosts;