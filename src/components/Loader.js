import { VStack, Box, Spinner, HStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <VStack justifyContent={"center"} h={"90vh"}>
      <Box transform={"scale(3)"}>
        <HStack>
          <Spinner color={"red"} size={"sm"} />
          <Spinner color={"yellow"} size={"md"} />
          <Spinner color={"green"} size={"xl"} />
        </HStack>
      </Box>
    </VStack>
  );
};

export default Loader;
