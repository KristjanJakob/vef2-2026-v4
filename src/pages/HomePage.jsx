import { useEffect, useState } from 'react';
import { fetchNews } from '../lib/api';
import NewsList from '../components/NewsList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function HomePage() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [paging, setPaging] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError('');

      try {
        const data = await fetchNews(page);
        setNews(data.data || []);
        setPaging(data.paging || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [page]);

  const hasPrevious = page > 1;
  const hasNext = paging ? paging.offset + paging.limit < paging.total : true;

  return (
    <section>
      <h1>Fréttir</h1>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <NewsList news={news} />}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={!hasPrevious}>
          Fyrri
        </button>
        <span>Síða {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={!hasNext}>
          Næsta
        </button>
      </div>
    </section>
  );
}

export default HomePage;