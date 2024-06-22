import NewsList from "@/components/news/news-list";
import { getLatestNews } from "@/lib/news";

export default async function LatestNewsPage() {
  const newsList = await getLatestNews();
  return (
    <>
      <h2>Latest News</h2>
      <NewsList newsList={newsList} />
    </>
  );
}
