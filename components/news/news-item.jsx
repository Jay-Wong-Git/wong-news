import Link from "next/link";

export default function NewsItem({ news }) {
  return (
    <>
      <h2>
        <Link href={`/news/${news.slug}`}>{news.title}</Link>
      </h2>
    </>
  );
}
