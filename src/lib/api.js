const API_URL = import.meta.env.VITE_API_URL;

export async function fetchNews(page = 1) {
  const limit = 10;
  const offset = (page - 1) * limit;

  const response = await fetch(
    `${API_URL}/news?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Ekki tókst að sækja fréttir');
  }

  return response.json();
}

export async function fetchNewsBySlug(slug) {
  const response = await fetch(`${API_URL}/news/${slug}`);

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

  let result = null;

  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error(result?.error || result?.message || '500 villa frá vefþjónustu');
    }

    throw new Error(
      result?.error ||
      result?.message ||
      JSON.stringify(result) ||
      'Villa við að búa til frétt'
    );
  }

  return result;
}