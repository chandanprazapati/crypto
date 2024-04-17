import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const ErrorCom = ({ message }) => {
  return (
    <Alert
      status={"error"}
      position={"fixed"}
      bottom={"5"}
      left={"620"}
      w={"container.md"}
      transform={"translateX(-50%)"}
    >
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default ErrorCom;
