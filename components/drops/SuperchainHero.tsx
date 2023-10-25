import { Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import React from "react";
import { Text } from "tw-components";

const SuperchainHero = () => {
  const logos = [
    {
      name: "optimism",
      src: require("public/assets/drops/logo/optimism.png"),
    },
    {
      name: "base",
      src: require("public/assets/drops/logo/base.png"),
    },
    {
      name: "zora",
      src: require("public/assets/drops/logo/zora.png"),
    },
  ];

  return (
    <Flex flexDir="column" width="full" alignItems="center" marginTop={16}>
      <Flex
        width="full"
        background="blue"
        flexDir="column"
        alignItems="center"
        maxWidth="1040px"
        padding={8}
        minHeight="200px"
        rounded="md"
      >
        <Flex wrap="wrap" gap="16px" marginTop="25px">
          {logos.map(({ name, src }) => {
            return (
              <ChakraNextImage
                width="60px"
                height="60px"
                key={name}
                src={src}
                alt={name}
              />
            );
          })}
        </Flex>

        <Text
          fontSize={45}
          color="#000"
          fontWeight="semibold"
          textAlign="center"
          lineHeight="60px"
          marginTop="31px"
        >
          Claim the Superchain Explorer NFT for building on the Superchain.
        </Text>

        <ChakraNextImage
          width="188px"
          height="188px"
          marginTop="55px"
          marginBottom="35px"
          key={"nft-blurry"}
          src={require("public/assets/drops/nft-blurry.png")}
          alt={"nft-blurry"}
        />
      </Flex>
    </Flex>
  );
};

export default SuperchainHero;
