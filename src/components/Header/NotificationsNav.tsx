import { HStack, Icon, Button } from '@chakra-ui/react';

import { RiNotificationLine, RiLogoutCircleRLine } from 'react-icons/ri';
import { signOut } from '../../contexts/AuthContext';

export function NotificationsNav() {
  return (
    <HStack
      spacing={["4", "6", "8"]}
      mx={["4", "6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.900"
      borderRightWidth={1}
      borderColor="gray.900"
    >
      <Icon color="gray.400" as={RiNotificationLine} fontSize="20" />
      <Button
        as="a"
        size="sm"
        fontSize="sm"
        color="gray.900"
        _hover={{
          color: 'gray.900',
          cursor: 'pointer',
        }}
        variant="outline"
        onClick={() => signOut()}
      >
        <Icon
          as={RiLogoutCircleRLine}
          fontSize="20"
          _hover={{
            color: 'red.500'
          }}
        />
      </Button>

    </HStack>
  );
}