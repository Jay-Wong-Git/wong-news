import Link from "next/link";

export default function NewsList({ newsList }) {
  return (
    <ul className="news-list">
      {newsList.map((news) => (
        <li key={news.id}>
          <Link href={`/news/${news.slug}`}>
            <img src={`/images/news/${news.image}`} />
            <span>{news.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
