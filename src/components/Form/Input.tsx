import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import { Input as ChakraInput, FormLabel, FormControl, Text, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  nameForm?: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ nameForm, label, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && 
          <FormLabel 
            htmlFor={nameForm}
          >
            <Text
              size="xl"
              colorScheme="gray.900"
            >
              {label}
            </Text>
          </FormLabel>
        }

        <ChakraInput
          id={nameForm}
          name={nameForm}
          focusBorderColor="blue.400"
          bgColor="gray.250"
          variant="filled"
          _hover={{
            bgColor: 'gray.200'
          }}
          size="lg"
          ref={ref}
          {...rest}
        />

        {!!error && (
          <FormErrorMessage>{error.message}</FormErrorMessage>
        )}

      </FormControl>
    )
  }

export const Input = forwardRef(InputBase);