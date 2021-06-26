import { useState } from 'react';

import Link from 'next/link';
import { useMutation } from 'react-query';
import { useRouter } from 'next/dist/client/router';
import { queryClient } from '../../services/queryClient';
import {
  Flex, Box, Heading, Divider, VStack, SimpleGrid, HStack, Button, useToast, Avatar,
  Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps, FormErrorMessage
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { Header } from "../../components/Header";
import { Sidebar } from '../../components/Sidebar';

import { api } from "../../services/apiClient";
import { GetServerSideProps } from 'next';

type EditUserFormData = {
  id: number;
  first_name: string;
  last_name: string;
}

const createUserFormSchema = yup.object().shape({
  first_name: yup.string().required('You must inform the first name'),
  last_name: yup.string().required('You must inform the last name'),
});

interface EditUserProps {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
}

export default function EditUser({ user }: EditUserProps) {
  const router = useRouter();
  const toast = useToast();
  const [userId, setUserId] = useState(user.id);

  const editUser = useMutation(async (user: EditUserFormData) => {
    const response = await api.put(`api/users/${userId}`, {
      "first_name": user.first_name,
      "last_name": user.last_name,
    });

    if (response.status === 200) {
      toast({
        title: "User successfully editted ",
        position: 'top-right',
        status: "success",
        isClosable: true,
        duration: 5000,
        onCloseComplete: () => {
          router.push('/dashboard');
        }
      });
    } else {
      toast({
        title: "Something went wrong. Plase try again later.",
        position: 'top-right',
        status: "error",
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          router.push('/dashboard');
        }
      });
    }

    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleEditUser: SubmitHandler<EditUserFormData> = async (values) => {
    await editUser.mutateAsync(values);
  }

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.100"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleEditUser)}
        >
          <Heading size="lg" fontWeight="normal">Edit user</Heading>

          <Divider my="6" borderColor="gray.300" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Avatar size="2xl" name="Naoshi Arimori" src={user.avatar} />

              <Input
                name="first_name"
                label="First name"
                error={formState.errors.first_name}
                {...register('first_name', { value: user.first_name })}
              />

              <Input
                name="last_name"
                label="Last name"
                error={formState.errors.last_name}
                {...register('last_name', { value: user.last_name })}
              />
            </SimpleGrid>

          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/dashboard" passHref>
                <Button
                  as="a"
                  bg="gray.400"
                  color="gray.100"
                  variant="outline"
                  _hover={{
                    bg: 'gray.500'
                  }}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                bg="blue.100"
                color="gray.100"
                _hover={{
                  bg: 'blue.500'
                }}
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { id } = params;

  const response = await api.get(`api/users/${id}?delay=2`);

  const user = response.data.data;

  return {
    props: {
      user
    }
  }
}