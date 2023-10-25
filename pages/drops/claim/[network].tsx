import { AppLayout } from "components/app-layouts/app";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { ComponentWithChildren } from "types/component-with-children";
import SuperchainHero from "components/drops/SuperchainHero";
import SuperchainSteps from "components/drops/SuperchainSteps";
import ClaimHero from "components/drops/ClaimHero";

const DropsClaimPage: ThirdwebNextPage = () => {
  const title = "Superchain";
  const description = "Superchain steps";

  return (
    <DropsClaimSDK chainId={420}>
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
      <ClaimHero />
    </DropsClaimSDK>
  );
};

export default DropsClaimPage;
DropsClaimPage.pageId = PageId.DropsSuperchain;
DropsClaimPage.getLayout = (page, props) => {
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

interface DropsClaimSDKProps {
  chainId: number;
}

export const DropsClaimSDK: ComponentWithChildren<DropsClaimSDKProps> = ({
  chainId,
  children,
}) => {
  return <CustomSDKContext>{children}</CustomSDKContext>;
};
