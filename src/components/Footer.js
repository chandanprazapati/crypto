import { VStack, Stack, Box, Avatar, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.900"}
      minH={"50"}
      px={"16"}
      py={("16", "8")}
      alignItems={"center"}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack alignItems={["center", "flex-start"]} w={"full"}>
          <Text
            fontFamily={"Bebas Neue"}
            fontWeight={"bold"}
            fontSize={"x-large"}
            p={"4"}
          >
            About__US
          </Text>
          <Text
            fontSize={"md"}
            letterSpacing={"widest"}
            textAlign={(["center"], ["left"])}
            p={"4"}
          >
            We are the best crypto treading app in Nepal, We provide You Our
            Guidance at a very cheap price_Rate...
          </Text>
        </VStack>
        <VStack>
          <Avatar mt={("4", "0")} boxSize={"28"} />
          <Text> Our Founder</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
