import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa6";
import { CgFileDocument } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";

const CFaUserAlt = chakra(FaUser);
const CFaLock = chakra(FaLock);
const DocumentIcon = chakra(CgFileDocument);
const UserIcon = chakra(FaRegUser);

interface LoginResponse {
  token: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
  };
}

const loginUser = async (userData: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(
    "http://localhost:3001/test",
    userData
  );
  return data;
};

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const { mutate, isError, error } = useMutation<
    LoginResponse,
    Error,
    { email: string; password: string }
  >(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token); // Save the token to localStorage or your preferred storage
      console.log("About to navigate: " + data.user.lastname);
      //navigate('/home'); // Navigate to the home page upon successful login
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
      >
        <VStack spacing={4} align="stretch">
          <Box width="100%">
            <Heading as="h4" size="md">
              Welcome to Transcript Manager
            </Heading>
          </Box>

          <SimpleGrid columns={[1, null, 2]} spacing={4}>
            <GridItem
              bg="#2c364c"
              boxShadow="md"
              width={{ base: "100%", lg: "400px" }}
              alignItems="center"
              textAlign="center"
              padding="10px"
            >
              <Stack
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                paddingTop="20px"
              >
                <Box width="100%" alignItems="center" textAlign="center">
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <DocumentIcon color="blue.200" size="50px" />
                  </Flex>
                </Box>

                <Heading color="blue.200" as="h4" size="md" paddingTop="20px">
                  Find a public Transcript
                </Heading>
                <Box width="100%">
                  <form>
                    <Stack spacing={4} p="1rem">
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<CFaUserAlt color="gray.300" />}
                          />
                          <Input type="email" placeholder="email address" />
                        </InputGroup>
                      </FormControl>

                      <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                        marginTop={{ base: "5px", lg: "84px" }}
                      >
                        Find
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Stack>
            </GridItem>
            <GridItem
              pl="2"
              bg="#2c364c"
              boxShadow="md"
              padding="10px"
              width={{ base: "100%", lg: "400px" }}
            >
              <Stack
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                paddingTop="20px"
              >
                <Box width="100%">
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <UserIcon color="blue.200" size="50px" />
                  </Flex>
                </Box>

                <Heading color="blue.200" as="h4" size="md" paddingTop="20px">
                  Manage your Transcript
                </Heading>
                <Box width="100%">
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={4} p="1rem">
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<CFaUserAlt color="gray.300" />}
                          />
                          <Input
                            type="email"
                            placeholder="email address"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            children={<CFaLock color="gray.300" />}
                          />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handleShowClick}
                            >
                              {showPassword ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormHelperText textAlign="right">
                          <Link>forgot password?</Link>
                        </FormHelperText>
                      </FormControl>
                      <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                      >
                        Login
                      </Button>
                      {isError && <div>Error: {error?.message}</div>}
                    </Stack>
                  </form>
                </Box>
              </Stack>
            </GridItem>
          </SimpleGrid>

          {/* <Box w="300px" h="200px" bg="red.200" mr="4">
          Box 1
        </Box> */}

          {/* <Box w="400px" h="200px">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Log In</Button>
            {isError && <div>Error: {error?.message}</div>}
          </form> 
        </Box> */}
        </VStack>
      </Flex>
    </>
  );
};
