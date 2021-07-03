import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../apiClient";
import { AuthTokenError } from "../errors/AuthTokenError";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export type GetUsersResponse = {
  totalCount: number;
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const response = await api.get(`/api/users?delay=2&page=${page}`);

  const users = response.data.data.map(user => {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };
  });

  const totalCount = response.data.total;

  return {
    totalCount,
    users
  };
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery<any>(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, //10 minutes, then it'll be fresh
    ...options,
  });
}