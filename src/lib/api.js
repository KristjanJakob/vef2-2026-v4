const API_URL = import.meta.env.VITE_API_URL;

export async function fetchNews(page = 1) {
  const response = await fetch(`${API_URL}/news?page=${page}`);

  if (!response.ok) {
    throw new Error('Ekki tókst að sækja fréttir');
  }

  return response.json();
}

export async function fetchNewsById(id) {
  const response = await fetch(`${API_URL}/news/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Villa við að sækja frétt');
  }

  return response.json();
}

export async function fetchAuthors() {
  const response = await fetch(`${API_URL}/authors`);

  if (!response.ok) {
    throw new Error('Ekki tókst að sækja höfunda');
  }

  return response.json();
}

export async function createNews(data) {
  const response = await fetch(`${API_URL}/news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status >= 500) {
    throw new Error('Innri villa í vefþjónustu');
  }

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || 'Villa við að búa til frétt');
  }

  return result;
}