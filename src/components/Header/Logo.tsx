import { Box } from "@chakra-ui/react";
import Link from 'next/link';

export function Logo() {
  return (
    <Box w="64">
      <Link href="https://www.wdgautomation.com/">
        <img src="/Logo.svg" alt="WDG Automation An IBM Company" />
      </Link>
    </Box>
  );
}