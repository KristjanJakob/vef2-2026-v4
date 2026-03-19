import { useEffect, useState } from 'react';
import { createNews, fetchAuthors } from '../lib/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import NewsForm from '../components/NewsForm';

function CreateNewsPage() {
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function loadAuthors() {
      setLoadingAuthors(true);
      setError('');

      try {
        const data = await fetchAuthors();

        if (Array.isArray(data)) {
          setAuthors(data);
        } else if (Array.isArray(data.items)) {
          setAuthors(data.items);
        } else {
          setAuthors([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingAuthors(false);
      }
    }

    loadAuthors();
  }, []);

  async function handleCreateNews(formData) {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await createNews(formData);
      setSuccess('Frétt var búin til.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Búa til frétt</h1>

      {loadingAuthors && <Loading />}
      {error && <ErrorMessage message={error} />}
      {success && <p className="success-message">{success}</p>}

      {!loadingAuthors && (
        <NewsForm
          authors={authors}
          onSubmit={handleCreateNews}
          loading={submitting}
        />
      )}
    </section>
  );
}

export default CreateNewsPage;