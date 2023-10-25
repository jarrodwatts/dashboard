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
import SuccessHero from "components/drops/SuccessHero";

const DropsSuccess: ThirdwebNextPage = () => {
  const title = "Superchain";
  const description = "Superchain steps";

  return (
    <DropsSuccessSDK chainId={420}>
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
      <SuccessHero />
    </DropsSuccessSDK>
  );
};

export default DropsSuccess;
DropsSuccess.pageId = PageId.DropsSuperchain;
DropsSuccess.getLayout = (page, props) => {
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

interface DropsSuccessSDKProps {
  chainId: number;
}

export const DropsSuccessSDK: ComponentWithChildren<DropsSuccessSDKProps> = ({
  chainId,
  children,
}) => {
  return <CustomSDKContext>{children}</CustomSDKContext>;
};
