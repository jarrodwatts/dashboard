import { Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useRouter } from "next/router";
import React from "react";
import { Text } from "tw-components";

const SuccessHero = () => {
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
      <ChakraNextImage
        width="60px"
        height="60px"
        src={selectedNetwork.src}
        alt={selectedNetwork.id}
      />

      <Text
        fontSize={45}
        color="#FFF"
        fontWeight="bold"
        textAlign="center"
        lineHeight="48px"
        marginTop="31px"
      >
        Base Sepolia NFT claimed 🎉
      </Text>
    </Flex>
  );
};

export default SuccessHero;
