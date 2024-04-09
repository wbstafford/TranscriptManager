import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Box,
  HStack,
  Flex,
  Spacer,
  Icon,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ExpandableDescription from "./ExpandableDescription";
import { course } from "./entities/Course";
import { CheckIcon } from "@chakra-ui/icons";

interface Params {
  userId: number;
}

async function fetchCourses(userId: number | undefined): Promise<course[]> {
  if (userId == undefined) {
    return [];
  }
  try {
    const response = await axios.get(
      `http://localhost:3001/api/courses/${userId}`
    );
    return response.data; // With axios, response.data is automatically the parsed JSON object
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("There was an error fetching the courses: ", error.message);
      // Handle Axios-specific error
      throw error;
    } else {
      // Handle unexpected errors
      console.error("An unexpected error occurred: ", error);
      throw error;
    }
  }
}

function formatDate(isoString: string | number | Date) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    //weekday: "long", // "Monday"
    year: "numeric", // "2018"
    month: "long", // "November"
    day: "numeric", // "1"
  });
}
const TranscriptCard = ({ userId }: Params) => {
  const [courses, setCourses] = useState<course[]>([]);

  useEffect(() => {
    fetchCourses(userId)
      .then(setCourses)
      .catch((error) => console.error("Failed to fetch courses", error));
  }, []);

  return (
    <>
      {courses.map((course) => (
        <Card
          border={course.Verified == "y" ? "2px solid" : "0px"}
          borderColor="blue.700"
          key={course.id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
        >
          <Image
            maxW={{ base: "100%", sm: "160px" }}
            maxH={{ base: "160px", sm: "160px" }}
            src={course.IconURL}
            alt={course.Name}
            marginY={2}
            marginLeft={2}
          />

          <Stack maxW="100%" width="100%">
            <CardBody textAlign="left">
              <Heading size="md" color="blue.200">
                {course.Name}
              </Heading>
              <ExpandableDescription>
                {course.Description}
              </ExpandableDescription>
            </CardBody>

            <CardFooter paddingTop={1} fontSize="12px">
              <Flex width="100%">
                <Box color="gray.300">
                  <Text
                    as="span"
                    color="blue.200"
                    display="inline"
                    fontWeight="bold"
                  >
                    Completed:
                  </Text>{" "}
                  {formatDate(course.CompletedDate)} |{" "}
                  <Text
                    as="span"
                    color="blue.200"
                    display="inline"
                    fontWeight="bold"
                  >
                    Provided by:
                  </Text>{" "}
                  {course.GrantedBy}
                  {course.Certified === "y" && (
                    <>
                      <Text
                        as="span"
                        color="blue.200"
                        display="inline"
                        fontWeight="bold"
                      >
                        {" "}
                        | Certificate Received
                      </Text>
                    </>
                  )}
                </Box>
                <Spacer />
                <Box color="gray.300">
                  {course.Verified === "y" && (
                    <>
                      Verified!
                      <Icon
                        as={CheckIcon}
                        color="green.200"
                        boxSize="1.5em"
                        marginLeft="1"
                        marginBottom={2}
                      />
                    </>
                  )}
                </Box>
              </Flex>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </>
  );
};

export default TranscriptCard;
