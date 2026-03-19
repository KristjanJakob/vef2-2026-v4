import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsBySlug } from '../lib/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function NewsPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError('');

      try {
        const data = await fetchNewsBySlug(id);
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!news) {
    return <p>Frétt fannst ekki.</p>;
  }

  return (
    <article>
      <h1>{news.title}</h1>
      <p>
        <strong>Útdráttur:</strong> {news.excerpt}
      </p>
      <p>
        <strong>Höfundur:</strong> {news.Author?.name || 'Óþekktur'}
      </p>
      <div>
        <strong>Texti:</strong>
        <p>{news.content}</p>
      </div>
    </article>
  );
}

export default NewsPage;