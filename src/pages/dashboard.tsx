import React, { useContext, useState } from "react"
import { Flex, HStack, Box, Text, Button, Heading, Icon, Spinner, useBreakpointValue, Avatar } from '@chakra-ui/react';
import NextLink from 'next/link';

import { AuthContext } from "../contexts/AuthContext";
import { Pagination } from '../components/Pagination';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useUsers } from "../services/hooks/useUsers";
import { UserCard } from "../components/UserCard";

export default function Dashboard({ users }) {
  const { isAuthenticated } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  //useQuery() -> chave da query 
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
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

                {/* <NextLink href="/users/create" passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="blue"
                    _hover={{
                      bg: 'blue.100'
                    }}
                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  >
                    New user
                  </Button>
                </NextLink> */}
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