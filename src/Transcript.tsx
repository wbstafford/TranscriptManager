import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import TranscriptCard from "./TranscriptCard";
import TranscriptHeader from "./TranscriptHeader";
import axios from "axios";
import { user } from "./entities/User";
import { useEffect, useState } from "react";

async function fetchUserByEmail(email: string): Promise<user | null> {
  if (email == null) {
    return null;
  } else {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user/${encodeURIComponent(email)}`
      );
      // Assuming the API directly returns a user object
      return response.data as user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("There was an error fetching the user: ", error.message);
        // Handle Axios-specific error here. For example, you might want to return null or throw a custom error
        return null; // Return null or handle as appropriate for your application
      } else {
        // Handle unexpected errors
        console.error("An unexpected error occurred: ", error);
        throw error; // Or handle as needed
      }
    }
  }
}

const Transcript = () => {
  const { email } = useParams();

  //get the info about the user
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    fetchUserByEmail(email!)
      .then(setUser)
      .catch((error) => console.error("Failed to fetch courses", error));
  }, []);

  return (
    <>
      {user ? (
        <Flex justifyContent="center" alignItems="center" width="100vw">
          <SimpleGrid columns={1} spacing={3} width="1000px">
            <Box paddingX={2}>
              <TranscriptHeader
                userName={user.FirstName + " " + user.LastName}
                AvatarURL={user.AvatarURL}
                Email={user.Email}
              />
            </Box>
            <Box paddingX={2}>
              <Text fontSize="18px" fontWeight="bold">
                Courses/certifications completed
              </Text>
            </Box>
            <TranscriptCard userId={user.id} />
          </SimpleGrid>
        </Flex>
      ) : (
        <p>The user does not have a transcript in this system</p>
      )}
    </>
  );
};

export default Transcript;
