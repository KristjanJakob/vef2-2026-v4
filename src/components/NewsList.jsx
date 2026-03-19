import NewsItem from './NewsItem';

function NewsList({ news }) {
  if (!news || news.length === 0) {
    return <p>Engar fréttir fundust.</p>;
  }

  return (
    <div className="news-list">
      {news.map((item) => (
        <NewsItem key={item.id} news={item} />
      ))}
    </div>
  );
}

export default NewsList;