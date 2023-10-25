import { Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useRouter } from "next/router";
import React from "react";
import { Text } from "tw-components";

const ClaimHero = () => {
  const router = useRouter();
  const network = router.query.network;

  const chains = [
    {
      id: "base",
      src: require("public/assets/drops/logo/base.png"),
      name: "Base Sepolia",
    },
  ];

  const selectedNetwork = chains.find((chain) => chain.id === network);

  if (!router.isReady) {
    return (
      <Text textAlign="center" color="white">
        Loading...
      </Text>
    );
  }

  if (!selectedNetwork) {
    return (
      <Text textAlign="center" color="white">
        Invalid URL. Please go back and try again.
      </Text>
    );
  }

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
        <ChakraNextImage
          width="60px"
          height="60px"
          src={selectedNetwork.src}
          alt={selectedNetwork.id}
        />

        <Text
          fontSize={45}
          color="#000"
          fontWeight="semibold"
          textAlign="center"
          lineHeight="50px"
          marginTop="20px"
          maxW="600px"
        >
          Deploy a contract on {selectedNetwork.name} to claim NFT
        </Text>
      </Flex>
    </Flex>
  );
};

export default ClaimHero;
