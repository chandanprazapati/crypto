import { HStack, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <HStack p={"3"} bgColor={"blackAlpha.900"} shadow={"base"}>
        <Button variant={"unstyled"} color={"white"}>
          <Link to="/">Home</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
          <Link to="/Exchange">Exchange</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
          <Link to="/Coins">Coins</Link>
        </Button>
      </HStack>
    </>
  );
};

export default Header;
