import { FrameMetadataType } from "@coinbase/onchainkit";
import { getAbsoluteUrl } from "./vercel-utils";

export const getStartedMetaData = (): FrameMetadataType => {
  return {
    buttons: [
      {
        label: "Swap Base ETH to $DEGEN 🎩",
        action: "post",
      },
    ],
    input: { text: "<amount>" },
    image: `${getAbsoluteUrl()}/assets/og-image/pay-tx-og-image.png`,
    post_url: `${getAbsoluteUrl()}/api/frame/base/pay?type=confirm`,
  };
};

export const getConfirmMetaData = (
  address: string,
  amount: string,
): FrameMetadataType => {
  const title = `Make sure you're connected with wallet address (${address}) before swapping + minimum purchase amount needs to be $1`;

  return {
    buttons: [
      {
        label: "Confirm",
        action: "post",
      },
    ],
    image: `${getAbsoluteUrl()}/api/frame/base/tx-pay-image?type=default&title=${encodeURIComponent(title)}`,
    post_url: `${getAbsoluteUrl()}/api/frame/base/pay?type=compute-transaction&amount=${amount}`,
  };
};

export const getConfirmPayMetaData = (amount: string): FrameMetadataType => {
  return {
    buttons: [
      {
        label: "← Confirm in wallet",
        action: "post",
      },
      {
        label: "Confirm in wallet",
        target: `${getAbsoluteUrl()}/api/frame/base/pay?type=tx&amount=${amount}`,
        action: "tx",
      },
    ],
    image: `${getAbsoluteUrl()}/assets/og-image/pay-tx-og-image.png`,
    post_url: `${getAbsoluteUrl()}/api/frame/base/pay?type=tx`,
  };
};
