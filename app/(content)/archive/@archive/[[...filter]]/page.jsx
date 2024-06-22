import Link from "next/link";
import { Suspense } from "react";

import NewsList from "@/components/news/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";

async function FilteredHeader({ year, month }) {
  let period = await getAvailableNewsYears();
  if (year && !month) {
    period = getAvailableNewsMonths(year);
  }
  if (year && month) {
    period = [];
  }

  const availableYears = await getAvailableNewsYears();
  if (
    (year && !availableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  )
    throw new Error("Invalid filter.");

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {period.map((el) => (
            <li key={el}>
              <Link href={year ? `/archive/${year}/${el}` : `/archive/${el}`}>
                {el}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNewsList({ year, month }) {
  let filteredNewsList;

  if (year && !month) {
    filteredNewsList = await getNewsForYear(year);
  }
  if (year && month) {
    filteredNewsList = await getNewsForYearAndMonth(year, month);
  }

  let content = <p>No news found for the selected period.</p>;

  if (filteredNewsList && filteredNewsList.length > 0)
    content = <NewsList newsList={filteredNewsList} />;

  return content;
}

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading header...</p>}>
        <FilteredHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNewsList year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
