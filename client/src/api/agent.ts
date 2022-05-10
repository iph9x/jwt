import axios from 'axios';

import { API_URL } from 'src/shared/constants';
import { getAccessToken, removeTokens, setAccessToken } from 'src/shared/lib';
import { AuthResponse } from 'src/store/user/action';

const agent = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
});

agent.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

        setAccessToken(response.data.accessToken);

        return agent.request(originalRequest);
      } catch {
        removeTokens();
      }
    }

    return Promise.reject(error);
  }
);

agent.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers = { ...config.headers };
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Подстановка "/" в конце строки запроса (для Safari)
  if (config.url && !config.url.includes('?') && config.url[config.url.length - 1] !== '/') {
    config.url += '/';
  }

  return config;
});

export { agent };
