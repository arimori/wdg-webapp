import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';

// let isRefreshing = false;
// let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://reqres.in',
    headers: {
      Authorization: `Bearer ${cookies['wdgauth.token']}`
    }
  });

  // Intercepta a todas as repostas
  api.interceptors.response.use(
    (response) => {
      return response;
    }, (error: AxiosError) => {
      // Remove token
      if (error.response?.status === 401) {
        signOut();
      }
    }
  );
  
  return api;
}