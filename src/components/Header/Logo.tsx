import { Box } from "@chakra-ui/react";
import Link from 'next/link';
import Image from 'next/image';
import LogoImg from '../../../public/Logo.svg';

export function Logo() {
  return (
    <Box w="64">
      <Link href="/">
        <Image src={LogoImg} alt="WDG Automation An IBM Company" />
      </Link>
    </Box>
  );
}