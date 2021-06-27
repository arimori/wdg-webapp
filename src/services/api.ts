import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://reqres.in',
    headers: {
      Authorization: `Bearer ${cookies['wdgauth.token']}`
    }
  });

  // Intercept all responses
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

  api.interceptors.request.use(
    (config) => {
      cookies = parseCookies(ctx);
      const { 'wdgauth.token': refreshToken } = cookies;
      const { 'wdgauth.userSignedIn': userSignedIn } = cookies;

      setCookie(ctx, 'wdgauth.token', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/' //all routes can access this cookie
      });      
      
      setCookie(ctx, 'wdgauth.userSignedIn', userSignedIn, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/' //all routes can access this cookie
      });      

      api.defaults.headers['Authorization'] = `Bearer ${refreshToken}`;
      return config;
    },
    (error) => {
      console.log(error);
    }
  )

  return api;
}