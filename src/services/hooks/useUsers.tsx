import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../apiClient";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

type GetUsersResponse = {
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('api/users');

  const users = data.users.map(user => {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };
  });

  return {
    users
  };
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, //10 minutes, then it'll be fresh
    ...options,
  });
}