const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}
