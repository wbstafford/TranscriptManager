import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  chakra
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FaLock, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

//ICONS
const CFaUserAlt = chakra(FaUser);
const CFaLock = chakra(FaLock);
const DocumentIcon = chakra(CgFileDocument);
const UserIcon = chakra(FaRegUser);

//INTERFACES
interface LoginResponse {
  token: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
  };
}

interface LookupResponse {
  id: number;
}

// const loginUser = async (userData: {
//   email: string;
//   password: string;
// }): Promise<LoginResponse> => {
//   const { data } = await axios.post<LoginResponse>(
//     "http://localhost:3001/test",
//     userData
//   );
//   return data;
// };

export const LoginForm: React.FC = () => {

  //Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lookupEmail, setLookupEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  // const { mutate, isError, error } = useMutation<
  //   LoginResponse,
  //   Error,
  //   { email: string; password: string }
  // >(loginUser, {
  //   onSuccess: (data) => {
  //     localStorage.setItem("token", data.token);
  //     //console.log("About to navigate: " + data.user.lastname);
  //     //navigate('/home'); // Navigate to the home page upon successful login
  //   },
  // });

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>('/api/login.js', { email, password });
      localStorage.setItem('token', data.token);
      //navigate('/home'); // Navigate to the home page upon successful login
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle the error from the API if it's an AxiosError
        setError(error.response.data.message);
      } else {
        // Generic error message for other errors
        setError('An unexpected error occurred.');
      }
    }
  };

  const lookup = async (email: string) => {
    try {
      const { data } = await axios.post<LookupResponse>(`http://localhost:3001/api/lookup/${email}`, {});
      const userId = data.id;
      console.log("Found user ID: " + userId);
      if (userId === 0) {
        setLookupError("That email does not exist.");
      } else {
        setLookupError("");
        navigate(`/transcript/${email}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setLookupError(error.response.data.message);
      } else {
        setLookupError('An unexpected error occurred.');
      }
    }
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleLookupSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    lookup(lookupEmail);
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
                  <form onSubmit={handleLookupSubmit}>
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
                            id="lookupEmail"
                            value={lookupEmail}
                            onChange={(event) => setLookupEmail(event.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <Text as="i" height="30px" color="red.300" > {lookupError && <>{lookupError}</>}</Text>
                      <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                        marginTop={{ base: "5px", lg: "54px" }}
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
                  <form onSubmit={handleLoginSubmit}>
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
                      {error && <div>{error}</div>}
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
