import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableDescription = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 200;

  if (!children) return null;

  if (children.length <= limit)
    return (
      <Text fontSize="14px" py="2">
        {children}
      </Text>
    );

  const summary = expanded ? children : children.substring(0, limit) + "...";

  return (
    <Text fontSize="14px" py="2" color="gray.300">
      {summary}
      <Button
        fontWeight="bold"
        size="xs"
        colorScheme="blue"
        onClick={() => setExpanded(!expanded)}
        marginLeft={2}
        padding={1}
      >
        {expanded ? "Less" : "More"}
      </Button>
    </Text>
  );
};

export default ExpandableDescription;
