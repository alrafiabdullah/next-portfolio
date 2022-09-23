import { Toaster, toast } from "react-hot-toast";
import { BiLike, BiDislike } from "react-icons/bi";

const Home = ({ post }) => {
  const likeClickHandler = () => {
    toast.success("Liked!", {
      icon: <BiLike />,
      style: {
        border: "1px solid #713200",
        // padding: "16px",
        color: "green",
      },
    });
  };

  const unLikeClickHandler = () => {
    toast.success("Unliked!", {
      icon: <BiDislike />,
      style: {
        border: "1px solid #713200",
        // padding: "16px",
        color: "red",
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Toaster />
      <h1>Blog Posts</h1>
      <hr />
      <div key={post.id.N}>
        <h1>{post.title.S}</h1>
        <p>{post.content.S}</p>
        <span><BiLike style={{ color: "blue", cursor: "pointer" }} onClick={likeClickHandler} /> <BiDislike style={{ color: "red", cursor: "pointer" }} onClick={unLikeClickHandler} /></span>
      </div>
      <hr />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/posts/2');
  console.log("Res: ", res);
  const post = await res.json();
  console.log("Post Res: ", post);

  return {
    props: {
      post
    },
    revalidate: 10
  };
};

export default Home;
