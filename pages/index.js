import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiLike, BiDislike } from "react-icons/bi";
import { HashLoader } from "react-spinners";

import Tags from "../components/Tags";

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
    <>
      <div align="center">
        <Toaster />
        <h3 className="fancy_gradient_text mt-5">Blogs By Abdullah Al Rafi</h3>
        <hr />
        <Tags allTags={[]} />
        <hr />
        <div className="card-columns" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {posts && posts.map((post, index) =>
            <div key={index} className="card p-3 m-3">
              <Link href={`/blogs/${post.slug}-${post.id}`}>
                <div style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}>
                  <h3 className="card-title" style={{ cursor: "pointer" }} onClick={titleClickHandler}>{post.title}</h3>
                  <HashLoader loading={loading} color="red" />
                </div>
              </Link>
              <div className="card-text">
                <Tags allTags={post.tags} /><br />
                <p>{post.body}</p>
                <span><BiLike style={{ color: "blue", cursor: "pointer" }} onClick={() => likeClickHandler(post.title)} /> <BiDislike style={{ color: "red", cursor: "pointer" }} onClick={() => unLikeClickHandler(post.title)} /></span>
              </div>
              <hr />
              <small className="text-muted">Written by: <strong className="fancy_gradient_text" style={{ color: "rgb(16, 240, 53)" }}>{post.written_by.username}</strong></small>
              <small className="text-muted">Published ... ago</small>
            </div>
          )}
        </div>
      </div >
    </>
  );
};

export const getStaticProps = async () => {
  let url = process.env.NEXT_PUBLIC_LOCAL_URL;
  if (process.env.NODE_ENV === "production") url = process.env.NEXT_PUBLIC_PROD_URL;

  const res = await fetch(`${url}/blog/`);
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