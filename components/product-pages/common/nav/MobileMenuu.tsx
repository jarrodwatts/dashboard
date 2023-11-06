import { Box, DrawerOverlay, Flex, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { DEVELOPER_RESOURCES, PRODUCTS, SOLUTIONS } from "./data";
import NavLink from "./NavLink";

const bgFixedPositionStyles = {
  position: "fixed",
  right: "0",
  left: "0",
  bottom: "0",
  height: "100%",
  width: "100%",
};

const MobileMenuu = () => {
  const products = [
    {
      label: "Products",
      links: PRODUCTS,
    },
    {
      label: "Solutions",
      links: SOLUTIONS,
    },
    {
      label: "Resources",
      links: DEVELOPER_RESOURCES,
    },
  ];
  return (
    <Fragment>
      <Box zIndex={999} {...(bgFixedPositionStyles as any)} background="red" />
      <Flex
        flexDir={"column"}
        alignItems={"flex-start"}
        position="fixed"
        right="0"
        left="0"
        bottom="0"
        height="100%"
        width="100%"
        bg={"red"}
        zIndex={999}
        overflowY="auto"
        background={"#000000"}
        maxH={"calc(100vh - 20px)"}
      >
        <NavLink />
      </Flex>
    </Fragment>
  );
};

export default MobileMenuu;
