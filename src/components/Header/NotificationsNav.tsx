import { HStack, Icon } from '@chakra-ui/react';
import { RiNotificationLine, RiUserShared2Fill } from 'react-icons/ri';

export function NotificationsNav() {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.900"
      borderRightWidth={1}
      borderColor="gray.900"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserShared2Fill} fontSize="20" />
    </HStack>
  );
}