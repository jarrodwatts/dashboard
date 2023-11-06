import { Box, DrawerOverlay, Flex, VStack } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import {
  DEVELOPER_RESOURCES,
  PRODUCTS,
  PRODUCT_SECTIONS,
  SOLUTIONS,
} from "./data";
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
  const [selectedProduct, setSelectedProduct] = useState();
  const products = [
    {
      label: "Products",
      sections: PRODUCT_SECTIONS,
      links: PRODUCTS,
    },
    {
      label: "Products",
      sections: PRODUCT_SECTIONS,
      links: PRODUCTS,
    },
    {
      label: "Products",
      sections: PRODUCT_SECTIONS,
      links: PRODUCTS,
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
        {products.map((product, index) => {
          return (
            <NavLink
              label={product.label}
              sections={product.sections}
              links={product.links}
              key={index}
            />
          );
        })}
      </Flex>
    </Fragment>
  );
};

export default MobileMenuu;
