import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    useToast,
    InputRightElement,
    Icon,
    FormHelperText

  } from '@chakra-ui/react'

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useEffect, useState } from "react";

import {useFormik} from "formik"
import { useDispatch, useSelector } from "react-redux";
import {useRouter} from "next/router"
import axios from "axios"
import jsCookie from "js-cookie"

import * as Yup from "yup"
function login()    
{

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading,setLoading] = useState(false)

    const dispatch = useDispatch();
  
    const authSelector = useSelector((state) => state.auth);
  
    const router = useRouter();
  
    const toast = useToast();
  
    const formik = useFormik({
        initialValues: {
        username:"",
        password:""
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required("username harus tepat"),
            password: Yup.string().required("password harus tepat"),
          }),
          validateOnChange: false,
        onSubmit: async (values) => {
          setLoading(true);

          try{
            const res = await axios.get("http://localhost:2000/users/",{
                params: {
                    username: values.username,
                    password: values.password,
                }
            })

            alert(res.data.length)
            if(!res.data.length){
                throw new Error("username or password is wrong")
            }

            const userData = res.data[0];
            const stringifyUserData = JSON.stringify(userData)

            jsCookie.set("user_data",stringifyUserData)
            setLoading(false)
          }
          catch(err){
            console.log(err)

            toast({
                status:"error",
                title:"login failed",
                description: err.message,
            })

            setLoading(false)

          }
        }
      });

    //   const inputHandler = (event) => {
    //     const { value, name } = event.target;
    
    //     formik.setFieldValue(name, value);
    //   };
    
            return (
              <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                  <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                      {formik.values.username}
                    </Text>
                  </Stack>
                  <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                      <FormControl id="username" isInvalid={formik.errors.username}>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" 
                        onChange={(event)=> formik.setFieldValue("username",event.target.value)}
                       />
                       <FormHelperText>
                        {formik.errors.username}
                       </FormHelperText>
                      </FormControl>
                      <FormControl id="password" isInvalid={formik.errors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                        <Input type={ passwordVisible? "text" : "password"}   
                        onChange={(event)=> formik.setFieldValue("password",event.target.value)}

                         />
                         <InputRightElement
                  children={
                    <Icon
                      fontSize="xl"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      as={passwordVisible ? IoMdEyeOff : IoMdEye}
                      sx={{ _hover: { cursor: "pointer" } }}
                    />
                  }
                />
                        </InputGroup>
                        <FormHelperText>
                        {formik.errors.password}
                       </FormHelperText>

                      </FormControl>
                      <Stack spacing={10}>
                     
                        <Button
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          onClick={formik.handleSubmit}
                          >
                          Sign in
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            );

}

export default login