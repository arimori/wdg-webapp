import React, { useContext, useState } from "react"
import { Flex, Box, Text, Heading, Spinner } from '@chakra-ui/react';

import { AuthContext } from "../contexts/AuthContext";
import { Pagination } from '../components/Pagination';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { User, useUsers } from "../services/hooks/useUsers";
import { UserCard } from "../components/UserCard";

interface DashboardProps {
  users: User[];
}

interface dataFromUsers {
  totalCount: number;
  users: User[];
}

export default function Dashboard({ users }: DashboardProps) {
  const { isAuthenticated } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,
  });

  return (
    <Flex direction="column" h="100vh">
      {isAuthenticated && (
        <>
          <Header />

          <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <Box flex="1" borderRadius="8" bg="gray.100" p="8">
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal">
                  Users
                  {!isLoading && isFetching && <Spinner size="sm" color="gray.900" ml="4" />}
                </Heading>
              </Flex>
              {isLoading ? (
                <Flex justify="center">
                  <Spinner />
                </Flex>
              ) : error ? (
                <Flex justify="center" >
                  <Text>Failed getting user data.</Text>
                </Flex>
              ) : (
                <>
                  {data.users.map(user => {
                    return (
                      <Box key={user.id} my="6">
                        <UserCard user={user} />
                      </Box>
                    )
                  })}

                  <Pagination
                    totalCountOfRegisters={data.totalCount}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </>
              )}
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  )
}