import { Flex, Box, Text, Avatar, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';

interface ProfileProps {
  showProfileData?: boolean;
}

interface UserAuthenticatedProps {
  full_name: string;
  email: string;
  avatar: string;
}

export function Profile({ showProfileData }: ProfileProps) {
  const { userSignedIn } = useContext(AuthContext);

  const [userAuthenticated, setUserAuthenticated] = useState<UserAuthenticatedProps>();
  

  async function getAllUsers() {
    const response = await api.get('/api/users?delay=2');

    const { first_name, last_name, email, avatar } = response.data.data.find(user => user.email === userSignedIn);

    setUserAuthenticated({
      full_name: `${first_name} ${last_name}`,
      email,
      avatar
    });
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <Flex align="center">
      {(showProfileData && userAuthenticated) && (
        <Box mr="4" textAlign="right">
          <Text
            colorScheme="gray.900"
            fontWeight="bold"
          >
            {userAuthenticated.full_name}
          </Text>
          <Text color="gray.900" fontSize="small">{userAuthenticated.email}</Text>
        </Box>
      )}
      {userAuthenticated ? (
        <Avatar size="md" name={userAuthenticated?.full_name} src={userAuthenticated?.avatar} />
      ) : (
        <Spinner size="sm" color="gray.900" ml="4" />
      )}
    </Flex>
  );
}