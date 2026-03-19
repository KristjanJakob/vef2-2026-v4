import { useState } from 'react';

function NewsForm({ authors, onSubmit, loading }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [text, setText] = useState('');
  const [authorId, setAuthorId] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      title,
      excerpt: summary,
      content: text,
      authorId: Number(authorId),
      published: true,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="news-form">
      <div>
        <label htmlFor="title">Titill</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="summary">Útdráttur</label>
        <input
          id="summary"
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="text">Texti</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows="8"
        />
      </div>

      <div>
        <label htmlFor="author">Höfundur</label>
        <select
          id="author"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        >
          <option value="">Veldu höfund</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Vista...' : 'Búa til frétt'}
      </button>
    </form>
  );
}

export default NewsForm;