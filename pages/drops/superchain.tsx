import { AppLayout } from "components/app-layouts/app";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { ComponentWithChildren } from "types/component-with-children";
import SuperchainHero from "components/drops/SuperchainHero";
import { Flex } from "@chakra-ui/react";
import SuperchainSteps from "components/drops/SuperchainSteps";

const DropsSuperChainPage: ThirdwebNextPage = () => {
  const title = "Superchain";
  const description = "Superchain steps";

  return (
    <SuperChainSDK chainId={420}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/drops-optimism.png`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <SuperchainHero />
      <SuperchainSteps />
    </SuperChainSDK>
  );
};

export default DropsSuperChainPage;
DropsSuperChainPage.pageId = PageId.DropsSuperchain;
DropsSuperChainPage.getLayout = (page, props) => {
  return (
    <AppLayout
      layout={"custom-contract"}
      noSEOOverride
      dehydratedState={props.dehydratedState}
    >
      {page}
    </AppLayout>
  );
};

interface DropsSuperChainSDKProps {
  chainId: number;
}

export const SuperChainSDK: ComponentWithChildren<DropsSuperChainSDKProps> = ({
  chainId,
  children,
}) => {
  return <CustomSDKContext>{children}</CustomSDKContext>;
};
