import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text 
            colorScheme="gray.900"
            fontWeight="bold"
          >
            Eve Holt
          </Text>
          <Text color="gray.900" fontSize="small">eve.holt@reqres.in</Text>
        </Box>
      )}
      <Avatar size="md" name="Naoshi Arimori" src="https://reqres.in/img/faces/4-image.jpg" />
    </Flex>
  );
}