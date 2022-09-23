import Link from "next/link";

function Home() {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <h3>{process.env.NODE_ENV}</h3>
        <Link href="/blogs"><button style={{ padding: "20px", fontSize: "1.5em", cursor: "pointer" }}><strong>Blogs</strong></button></Link>
      </div>
    </>
  );
}

export default Home;
