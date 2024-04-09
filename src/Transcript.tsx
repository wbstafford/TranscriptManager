import { useParams } from "react-router-dom";
import TranscriptHeader from "./TranscriptHeader";
import useUser from "./hooks/useUser";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const Transcript = () => {
  const { email } = useParams();

  //get the info about the user
  const { data: user, isLoading, error } = useUser(email!);

  console.log(user?.FirstName);

  return (
    <>
      <Flex justifyContent="center" alignItems="center" width="100vw">
        <SimpleGrid columns={1} spacing={3} width="1000px">
          <Box paddingX={2}>
            <TranscriptHeader
              userName={user?.FirstName + " " + user?.LastName}
              AvatarURL={user?.AvatarURL}
            />
          </Box>

          <Card direction={{ base: "column", sm: "row" }} overflow="hidden">
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />

            <Stack maxW="100%" width="100%">
              <CardBody>
                <Heading size="md">The perfect latte</Heading>

                <Text py="2">
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Text>
              </CardBody>

              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  Buy Latte
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Transcript;
