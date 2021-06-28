import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from "../services/apiClient";

type User = {
  token: string
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: string;
  isAuthenticated: boolean;
  userSignedIn?: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'wdgauth.token');
  destroyCookie(undefined, 'wdgauth.userSignedIn');

  authChannel?.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState('');
  const [userSignedIn, setUserSignedIn] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'wdgauth.token': token } = parseCookies();
    const { 'wdgauth.userSignedIn': email } = parseCookies();

    if (token) {
      setUser(token);
      setIsAuthenticated(true);
      setUserSignedIn(email);
    } else {
      signOut();
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/api/login?delay=2', {
        email,
        password
      });

      const { token } = response.data;

      setCookie(undefined, 'wdgauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/' //all routes can access this cookie
      });

      setCookie(undefined, 'wdgauth.userSignedIn', email, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/' //all routes can access this cookie
      });

      setUser(token);
      setIsAuthenticated(true);
      setUserSignedIn(email);

      api.defaults.headers['Authorization'] = `Bearer ${token}`; //updating token after login

      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
      setUserSignedIn('');
    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      isAuthenticated,
      user,
      userSignedIn
    }}>
      {children}
    </AuthContext.Provider >
  )
}