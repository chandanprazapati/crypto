import React from "react";
import { Box, Center, Image, Text, color } from "@chakra-ui/react";
import cryptoo from "../assets/cryptoo.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
        <motion.div
          style={{
            height: "80vh",
          }}
          animate={{
            translateY: "100px",
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Center>
            <Image
              src={cryptoo}
              objectFit={"contain"}
              boxSize="400px"
              borderRadius={"3xl"}
            />
          </Center>
        </motion.div>

        <Text
          fontSize={"6xl"}
          fontWeight={"thin"}
          textAlign={"center"}
          color={"whiteAlpha.700"}
          mt={"-15"}
        >
          XCrypto
        </Text>
      </Box>
    </>
  );
};

export default Home;
