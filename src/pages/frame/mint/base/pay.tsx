import Head from "next/head";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";

const title = "Transaction Farcaster Frame on Base | thirdweb";
const description =
  "This is an example transaction frame on Base for users to mint an NFT or perform an onchain transaction, directly on Farcaster. Get started with thirdweb.";

const BaseFramePage = () => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/pay-tx-og-image.png`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta
          name="fc:frame:image"
          content={`${getAbsoluteUrl()}/assets/og-image/pay-tx-og-image.png`}
        />
        <meta
          property="fc:frame:button:1"
          content="Swap Base ETH to $DEGEN 🎩"
        />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta
          property="fc:frame:button:1:target"
          content={`${getAbsoluteUrl()}/api/frame/base/pay?type=confirm`}
        />
        <meta property="fc:frame:input:text" content="<amount>" />
      </Head>
    </>
  );
};

export default BaseFramePage;
