import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Flex, HStack, Box, Text, Button, Icon, Avatar, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast, useBreakpointValue,
} from '@chakra-ui/react';
import { RiDeleteBinLine, RiEditBoxLine } from "react-icons/ri";

import { User } from '../../services/hooks/useUsers';
import { api } from '../../services/apiClient';

interface UserCard {
  user: User;
}

export function UserCard({ user }: UserCard) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handleRemoveUser(id: number) {
    const { status } = await api.delete(`api/users/${id}`);

    if (status === 204 || status === 200) {
      toast({
        title: "User successfully removed",
        position: 'top-right',
        status: "success",
        isClosable: true,
        duration: 5000,
        onCloseComplete: () => {
          onClose();
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
          onClose();
          router.push('/dashboard');
        }
      });
    }
  }

  return (
    <Flex align="center" justify="space-between">

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> Are you sure you want do delete this user?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleRemoveUser(user.id)}
            >
              Yes
            </Button>
            <Button variant="ghost">
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex>
        <Avatar
          size="md"
          name={`${user.first_name} ${user.last_name}`}
          src={user.avatar}
        />
        <Box ml={["2", "4"]}>
          <Text fontWeight="bold" fontSize={['sm', 'md', 'lg']}>
            {user.first_name} {user.last_name}
          </Text>

          <Text fontSize={['sm', 'md', 'lg']}>
            {user.email}
          </Text>
        </Box>
      </Flex>

      <Flex justifyContent="space-between">
        <HStack>
          <NextLink
            passHref
            href={{
              pathname: '/users/[id]',
              query: { id: user.id },
            }}
          >
            {isWideVersion ? (
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                variant="outline"
                leftIcon={<Icon as={RiEditBoxLine} fontSize="20" />}
              >
                Edit
              </Button>
            ) : (
              <Button
                as="a"
                size="xs"
                fontSize="sm"
                colorScheme="blue"
                variant="ghost"
              >
                <Icon as={RiEditBoxLine} fontSize="20" />
              </Button>
            )}
          </NextLink>

          {isWideVersion ? (
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              variant="outline"
              onClick={onOpen}
              leftIcon={<Icon as={RiDeleteBinLine} fontSize="20" />}
            >
              Delete
            </Button>
          ) : (
            <Button
              as="a"
              size="xs"
              fontSize="sm"
              colorScheme="pink"
              variant="ghost"
              onClick={onOpen}
            >
              <Icon as={RiDeleteBinLine} fontSize="20" />
            </Button>
          )}
        </HStack>
      </Flex>
    </Flex>
  )
}