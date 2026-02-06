import { Home } from "./components/Home/Home";
import { getBlogs } from "./services/blogService";

export const revalidate = 10;

export default async function MainHome() {
  const blogs = await getBlogs().catch(() => []);
  return <Home initialBlogs={blogs} />;
}
