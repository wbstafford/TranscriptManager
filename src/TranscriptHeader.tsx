import {
  HStack,
  Avatar,
  Image,
  Flex,
  Heading,
  Box,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

interface Props {
  userName?: string;
  AvatarURL?: string;
}

const TranscriptHeader = ({ userName, AvatarURL }: Props) => {
  return (
    <>
      <Flex width="100%">
        <Box paddingTop={5}>
          <Stack textAlign="left" spacing={0}>
            <Heading as="h3" fontSize="24px">
              {userName}
            </Heading>
            <Text>brian.stafford@yahoo.com</Text>
          </Stack>
        </Box>
        <Spacer />
        <Box p="4">
          <Avatar
            border="2px solid #111"
            size="lg"
            name="Brian Stafford"
            src={AvatarURL}
          />
        </Box>
      </Flex>
    </>
  );
};

export default TranscriptHeader;
