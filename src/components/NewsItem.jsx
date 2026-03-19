import { Link } from 'react-router-dom';

function NewsItem({ news }) {
  return (
    <article className="news-card">
      <h2>{news.title}</h2>
      <p>{news.excerpt}</p>
      <p>
        <strong>Höfundur:</strong> {news.Author?.name || 'Óþekktur'}
      </p>
      <Link to={`/news/${news.slug}`}>Lesa meira</Link>
    </article>
  );
}

export default NewsItem;