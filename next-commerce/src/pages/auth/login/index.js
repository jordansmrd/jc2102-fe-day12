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
  Icon,
  InputRightAddon,
  InputRightElement,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import axios from "axios";
import jsCookie from "js-cookie";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import auth_types from "../../../redux/reducers/types/auth";
import { userLogin } from "../../../redux/action/userLogin";
export default function login() {
  const [passwordView, setPasswordView] = useState(false);

  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("email harus diisi"),
      password: Yup.string().required("password harus diisi"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(userLogin(values, formik.setSubmitting));

      // try {
      //   const res = await axiosInstance.get("/users/", {
      //     params: {
      //       email: values.email,
      //       password: values.password,
      //     },
      //   });

      //   if (res.data.length === 0) {
      //     throw new Error("user not found");
      //   }
      //   const userData = res.data[0];
      //   dispatch({
      //     type: auth_types.AUTH_LOGIN,
      //     payload: userData,
      //   });

      //   const parseData = JSON.stringify(userData);
      //   jsCookie.set("user_data", parseData);
      //   alert("test");
      // } catch (err) {
      //   console.log(err);

      //   toast({
      //     status: "error",
      //     title: "login failed",
      //     description: err.message,
      //   });
      // }
    },
  });

  useEffect(() => {
    if (userSelector?.id) {
      router.push("/");
    }
  }, [userSelector?.id]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {formik.values.email}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={formik.errors.email}>
              <FormLabel>Email address</FormLabel>

              <Input
                type="email"
                onChange={(event) =>
                  formik.setFieldValue("email", event.target.value)
                }
              />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>
            <FormControl id="password" isInvalid={formik.errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={passwordView ? "text" : "password"}
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                />

                <InputRightAddon>
                  <Icon
                    fontSize="xl"
                    onClick={() => setPasswordView(!passwordView)}
                    as={passwordView ? IoMdEye : IoMdEyeOff}
                    sx={{ _hover: { cursor: "pointer" } }}
                  />
                </InputRightAddon>
              </InputGroup>
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={formik.handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
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
