import { HStack, Avatar, Image, Flex } from '@chakra-ui/react';

const TranscriptHeader = () => {
    return (
        <Flex
        justifyContent="center"
        alignItems="center"
        width="1000px"
      >
            <HStack padding="10px">
                <Avatar border="2px solid #111" size='xl' name='Brian Stafford' src="/public/pic1.jpg" />
            </HStack>
        </Flex>
      );
}

export default TranscriptHeader