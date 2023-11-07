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
  const [selectedLabel, setSelectedLabel] = useState<any>({
    id: "",
    label: "",
  });

  const products = {
    products: {
      title: "Products",
      sections: PRODUCT_SECTIONS,
      links: PRODUCTS,
    },
  };
  // @ts-ignore
  const selectedProduct = products[selectedLabel.id];

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
        {!!selectedProduct
          ? selectedProduct.links
              .filter((link) => link.section === selectedLabel.label)
              .map((link, index) => {
                return (
                  <h1 key={index} style={{ color: "#fff" }}>
                    {link.name}
                  </h1>
                );
              })
          : Object.entries(products).map(
              ([title, { sections, links }], index) => {
                return (
                  <NavLink
                    title={title}
                    label={title}
                    sections={sections}
                    links={links}
                    key={index}
                    setSelectedLabel={setSelectedLabel}
                  />
                );
              },
            )}
      </Flex>
    </Fragment>
  );
};

export default MobileMenuu;
