/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useAuth } from "index";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentuser } from "components/store/slices/UserSlice";
import { login } from "components/store/slices/UserSlice";
import axios from "axios";
import { Field, Form, Formik } from 'formik';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

const navigate=useNavigate()

  const dispatch=useDispatch();
  const userdata=useSelector((state)=>{
return state.user.userinfo;
  })

 
const validateemail = (value) => {
  let error;
  const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!value) {
    error = 'Email is required';
  } else if (!regex.test(value)) {
    error='Email is not in valid format'
  }
  return error;
};

const validatepassword = (value) => {
  const uppregex=/[A-Z]/
  let error;
  if (!value) {
    error = 'Password is required';
  }
  else if(value.length < 6 ||  value.length>32)
    {
error="Password length must be in between 6 and 32"
    } 
    else if (!uppregex.test(value)) {
      
      
    error="Password must contain at least one uppercase letter"
    }
    else if (!/[0-9]/.test(value)) {
    error="Password must contain at least one Number"
    }
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        error="Password must contain at least one Special Character"
      }  

  return error;
};


  const handleSubmit=(email,password)=>{
// const storedemail=(localStorage.getItem(email))
// const storedpassword=(localStorage.getItem(password))

      axios
      .post('http://localhost:8000/api/v1/user/login', {
        'email': email,
        'password': password,
      })
      .then((res) => {console.log(res)
        dispatch(login(email))
        navigate('/dashboard')
      })
      .catch((err) => console.log(err));


// if(user_value.length==0)
// {
//   return ;
// }
//     if( password==userdata[user_value])
//     {
    
//       localStorage.setItem('email',email)

//   
//     
//     }
  }



  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex>


          <Formik
          initialValues={{email:'',password:''}}
          onSubmit={(values,actions)=>{
            handleSubmit(values.email,values.password)
            actions.setSubmitting(false);
          }}
          >
            {(props) => (
              <Form>
                <Field name="email" validate={validateemail}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel
                        display="flex"
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColor}
                        mb="8px"
                        htmlFor="email"
                      >
                        Email<Text color={brandStars}>*</Text>
                      </FormLabel>
                      <Input
                        {...field}
                        id="email"
                      
                        variant="auth"
                        fontSize="sm"
                        ms={{ base: '0px', md: '0px' }}
                        type="email"
                        placeholder="mail@gmail.com"
                        mb="0px"
                        fontWeight="500"
                        size="lg"
                       

                      ></Input>
                      {/* <br></br>
                      <br/> */}
                      <Box minHeight="20px" mt="0px" pt="0px" mb="4px" >
                      <FormErrorMessage >
                      {form.errors.email}</FormErrorMessage>
                     </Box>
                    </FormControl>
                  )}
                </Field>

                <Field name="password" validate={validatepassword}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      display="flex"
                    >
                      Password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                      {...field}
                    

                        fontSize="sm"
                        placeholder="Min. 8 characters"
                        mb="0px"
                        size="lg"
                        type={show ? 'text' : 'password'}
                        variant="auth"
                        id='password'
                      />

                      <InputRightElement
                        display="flex"
                        alignItems="center"
                        mt="4px"
                      >
                        <Icon
                          color={textColorSecondary}
                          _hover={{ cursor: 'pointer' }}
                          as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                          onClick={handleClick}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <Box minHeight="20px" mt="0px" pt="0px" mb="4px" >
                      <FormErrorMessage >
                      {form.errors.password}</FormErrorMessage>
                     </Box>
                  </FormControl>
                )}
                </Field>
                

                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Checkbox
                      id="remember-login"
                      colorScheme="brandScheme"
                      me="10px"
                    />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      fontWeight="normal"
                      color={textColor}
                      fontSize="sm"
                    >
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                  <NavLink to="/auth/forgot-password">
                    <Text
                      color={textColorBrand}
                      fontSize="sm"
                      w="124px"
                      fontWeight="500"
                    >
                      Forgot password?
                    </Text>
                  </NavLink>
                </Flex>
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  isLoading={props.isSubmitting}
                  type='submit'
                  disabled={props.isSubmitting || !props.isValid}
                >
                  Sign In
                </Button>
                {/* </FormControl> */}
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="start"
                  maxW="100%"
                  mt="0px"
                >
                  <Text
                    color={textColorDetails}
                    fontWeight="400"
                    fontSize="14px"
                  >
                    Registered?
                    <NavLink to="/sign-up">
                      <Text
                        color={textColorBrand}
                        as="span"
                        ms="5px"
                        fontWeight="500"
                      >
                        Sign Up
                      </Text>
                    </NavLink>
                  </Text>
                </Flex>
              </Form>
            )}
          </Formik>


        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
