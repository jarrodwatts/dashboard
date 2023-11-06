import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "tw-components";

const NavLink = () => {
  return (
    <Box w="100%">
      <Text
        color="#fff"
        fontWeight={800}
        fontSize={16}
        marginLeft={"32px"}
        marginBottom={"16px"}
      >
        123
      </Text>
      <Box
        background={"#0E0F11"}
        padding={"20px 32px"}
        w="100%"
        cursor={"pointer"}
      >
        <Text fontWeight={600} color={"#fff"} fontSize={"16px"}>
          Smart Contracts
        </Text>
        <Text marginTop={"4px"} color={"#fff"} fontSize={"14px"}>
          Create, deploy, and interact with contracts
        </Text>
      </Box>
    </Box>
  );
};

export default NavLink;
