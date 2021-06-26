import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  //debounce

  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.400"
      position="relative"
      bg="gray.100"
      borderRadius="full"
    >
      <Input
        color="gray.300"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Search"
        _placeholder={{ color: 'gray.400' }}
        ref={searchInputRef}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}