import HomePageCard from "components/homepage/sections/HomePageCard";
import { AnyEVMSection } from "../components/homepage/sections/AnyEVM";
import { Box, Center, DarkMode, Flex } from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { GetStartedSection } from "components/homepage/sections/GetStartedSection";
import { HeroSection } from "components/homepage/sections/HeroSection";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { PricingSection } from "components/homepage/sections/PricingSection";
import { SDKSection } from "components/homepage/sections/SDKSection";
import { SolutionsSection } from "components/homepage/sections/Solutions";
import { StatsSection } from "components/homepage/sections/StatsSection";
import { ValuesSection } from "components/homepage/sections/ValuesSection";
import { WithoutThirdwebSection } from "components/homepage/sections/WithoutThirdwebSection";
import { PartnerCarousel } from "components/partners/carousel";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { PageId } from "page-id";
import { Suspense, useEffect } from "react";
import { ThirdwebNextPage } from "utils/types";
import { metrics } from "components/product-pages/common/nav/data";
import { Heading, Text } from "tw-components";
import LandingCardWithMetrics from "components/landing-pages/card-with-metrics";
import { thirdwebClient } from "lib/thirdweb-client";
import { getBuyWithCryptoQuote } from "thirdweb";

const TRACKING_CATEGORY = "homepage";

const HomePage: ThirdwebNextPage = () => {
  useEffect(() => {
    const test = async () => {
      const quote = await getBuyWithCryptoQuote({
        client: thirdwebClient,
        fromAddress: "0x7713974908Be4BEd47172370115e8b1219F4A5f0",
        fromChainId: 1,
        fromTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        fromAmount: "10",
        toChainId: 137,
        toTokenAddress: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      });
      console.log({ quote });
    };

    test();
  }, []);

  return (
    <DarkMode>
      <Flex
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
        justify="center"
        flexDir="column"
        as="main"
        bg="#000"
      >
        <HomepageTopNav />
        <Box mt="-80px" pt={{ base: "100px", xl: "40px" }} overflowX="hidden">
          <HeroSection TRACKING_CATEGORY={TRACKING_CATEGORY} />
          <PartnerCarousel />
          <StatsSection />
          <HomePageCard
            title="Client SDKs to connect users to web3"
            description="Onboard every user, connect to any wallet, and build apps that anyone can use — with in-app wallets, account abstraction, and fiat & crypto payments."
            miniTitle="Connect"
            miniImage={require("../../public/assets/landingpage/connect-icon.png")}
            ctaText="Get started"
            label="get-started-connect"
            ctaLink="/connect"
            image={require("../../public/assets/landingpage/connect-hero.png")}
            mobileImage={require("../../public/assets/landingpage/connect-hero.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="Dedicated APIs for web3 apps & games"
            description="Scalable smart contract APIs backed by secure wallets, with automatic nonce queuing & gas-optimized retries."
            miniTitle="Engine"
            miniImage={require("../../public/assets/landingpage/engine-icon.png")}
            ctaText="Get started"
            label="get-started-engine"
            ctaLink="/engine"
            image={require("../../public/assets/landingpage/engine-hero.png")}
            mobileImage={require("../../public/assets/landingpage/engine-hero.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="End-to-end tools for smart contracts"
            description="Trusted and modular smart contracts that can be deployed securely on any EVM chain."
            miniTitle="Contracts"
            miniImage={require("../../public/assets/landingpage/contracts-icon.png")}
            ctaText="Get started"
            label="get-started-contracts"
            ctaLink="/contracts"
            image={require("../../public/assets/landingpage/contracts-hero.png")}
            mobileImage={require("../../public/assets/landingpage/contracts-hero.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />

          <Box px={4}>
            <LandingCardWithMetrics
              title={
                <Center flexDir="column" textAlign="center">
                  <Heading size="display.sm" color="white">
                    Trusted by the best
                  </Heading>

                  <Text fontSize={[16, 20]} mt={6}>
                    Powering web3 apps across verticals — from onchain games to
                    creator platforms.
                  </Text>
                </Center>
              }
              desktopColumns={3}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              metrics={metrics}
            />
          </Box>

          <WithoutThirdwebSection />
          <ValuesSection />
          <Suspense>
            <SDKSection />
            <AnyEVMSection />
            <PricingSection trackingCategory={TRACKING_CATEGORY} onHomepage />
            <SolutionsSection />
            <GetStartedSection />
            <NewsletterSection />
            <HomepageFooter />
          </Suspense>
        </Box>
      </Flex>
    </DarkMode>
  );
};

HomePage.pageId = PageId.Homepage;

export default HomePage;
