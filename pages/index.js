const Home = ({ post }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Blog Posts</h1>
      <hr />
      <div key={post.id.N}>
        <h1>{post.title.S}</h1>
        <p>{post.content.S}</p>
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
