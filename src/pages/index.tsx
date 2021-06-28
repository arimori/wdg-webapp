import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Stack, Button, Text, Heading, Box } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext } from '../contexts/AuthContext';
import LogoImg from '../../public/Logo.svg';
import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Please enter a valid email.').email('Invalid e-mail'),
  password: yup.string().required('Your password must be at least 6 characters that is alphanumerics.'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    event?.preventDefault();

    const data: SignInFormData = {
      email: values.email,
      password: values.password
    }

    await signIn(data);
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={[360, 650]}
        height={800}
        bg="gray.100"
        p={["16", "4"]}
        borderRadius={8}
        flexDir="column"
        align="center"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Box my={["6", "10"]}>
          <Link href="https://www.wdgautomation.com/">
            <Image 
              src={LogoImg}
              alt="WDG Automation An IBM Company" 
            />
          </Link>
        </Box>

        <Heading
          my={["6", "10"]}
          colorScheme="gray.900"
          as="h1"
          size="xl"
        >
          Welcome back
        </Heading>

        <Stack spacing="4">
          <Input
            type="email"
            nameForm="email"
            label="E-mail"
            width={[240, 420]}
            error={formState.errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            nameForm="password"
            label="Senha"
            width={[240, 420]}
            error={formState.errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt={["4", "12"]}
          width={[240, 420]}
          bg="blue.100"
          _hover={{
            bgColor: 'blue.300'
          }}
          size="lg"
          isLoading={formState.isSubmitting}
        >
          <Text color="gray.100">
            Sign In
          </Text>
        </Button>
      </Flex>
    </Flex>
  )
}
