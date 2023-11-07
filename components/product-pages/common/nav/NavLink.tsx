import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "tw-components";

interface NavLinkProps {
  label: string;
  sections: any;
  links: any;
  setSelectedLabel: any;
  title: any;
}

const NavLink = ({
  title,
  label,
  sections,
  setSelectedLabel,
}: NavLinkProps) => {
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

      {sections.map((section: any, index: number) => {
        return (
          <Box
            background={"#0E0F11"}
            padding={"20px 32px"}
            w="100%"
            cursor={"pointer"}
            key={index}
            onClick={() =>
              setSelectedLabel({ id: title, label: section.label })
            }
          >
            <Text fontWeight={600} color={"#fff"} fontSize={"16px"}>
              {section.name}
            </Text>
            <Text marginTop={"4px"} color={"#fff"} fontSize={"14px"}>
              {section.description}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default NavLink;
