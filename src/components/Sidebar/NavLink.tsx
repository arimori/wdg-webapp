import { ElementType } from "react";
import { Link as ChakraLink, Flex, Icon, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink {...rest}>
        <Flex
          display="flex"
          align="center"
        >
          <Icon as={icon} fontSize="20" />
          <Text
            ml="4"
            fontWeight="medium"
            fontSize="lg"
            decoration="none"
          >
            {children}
          </Text>
        </Flex>
      </ChakraLink>
    </ActiveLink>
  )
}