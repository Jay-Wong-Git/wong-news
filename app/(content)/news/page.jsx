import NewsList from "@/components/news/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const newsList = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList newsList={newsList} />
    </>
  );
}