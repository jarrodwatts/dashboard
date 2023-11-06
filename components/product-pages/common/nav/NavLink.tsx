import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "tw-components";

interface NavLinkProps {
  label: string;
  sections: any;
  links: any;
}

const NavLink = ({ label, links }: NavLinkProps) => {
  return (
    <Box w="100%">
      <Text
        color="#fff"
        fontWeight={800}
        fontSize={16}
        marginLeft={"32px"}
        marginBottom={"16px"}
      >
        {label}
      </Text>

      {links.map((link: any, index: number) => {
        return (
          <Box
            background={"#0E0F11"}
            padding={"20px 32px"}
            w="100%"
            cursor={"pointer"}
            key={index}
          >
            <Text fontWeight={600} color={"#fff"} fontSize={"16px"}>
              {link.name}
            </Text>
            <Text marginTop={"4px"} color={"#fff"} fontSize={"14px"}>
              {link.description}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default NavLink;
