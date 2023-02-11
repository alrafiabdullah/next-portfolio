import Link from "next/link";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import Tags from "../../components/Tags";

const BlogPost = ({ post }) => {
    const [loading, setLoading] = useState(false);

    const backButtonClickHandler = () => {
        setLoading(true);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h3 className="fancy_gradient_text mt-5">Blog Title: {post.title}</h3>
            <Tags allTags={post.tags} /><br />
            <p style={{ border: "1px solid black", padding: "20px", marginRight: "100px", marginLeft: "100px" }}>{post.body}</p>
            <div style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
            }}>
                <HashLoader loading={loading} color="red" />
            </div>
            <Link href="/"><button className="btn btn-info" onClick={backButtonClickHandler}>Back to Blogs</button></Link>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const { blogid } = context.params;

    // split string by - and take the last item
    const idArr = blogid.split("-");
    const id = idArr.slice(-5).join("-");

    let url = process.env.NEXT_PUBLIC_LOCAL_URL;
    if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_PROD_URL;
    }

    const res = await fetch(`${url}/blog/?blog_id=${id}`);
    const post = await res.json();

    return {
        props: {
            post: post,
            title: post.title,
        },
    };
};


export default BlogPost;