import React, { useContext, useEffect } from "react"
import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';

import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/apiClient"

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);

  async function getUsers() {
    const response = await api.get('/api/users?delay=2');

    console.log(response);
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUsers();
    }
  }, []);

  return (
    <Flex direction="column" h="100vh">
      {isAuthenticated && (
        <>
          <Header />

          <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
              <Box
                p={["6", "8"]}
                bg="gray.100"
                borderRadius={8}
                pb="4"
              >
                <Text fontSize="xl" mb="4">Users</Text>
              </Box>
            </SimpleGrid>
          </Flex>
        </>
      )}
    </Flex>
  )
}