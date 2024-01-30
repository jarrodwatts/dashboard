import { DarkMode } from "@chakra-ui/react";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { Metadata } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { PageId } from "page-id";
import { Fragment } from "react";
import { ThirdwebNextPage } from "utils/types";

type GenerateMetaDataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function FramesMint() {
  return (
    <Fragment>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content={`${process.env.NEXT_PUBLIC_HOST}/assets/og-image/marketplace-solutions.png`}
        />
        <meta
          property="fc:frame:post_url"
          content={`${process.env.NEXT_PUBLIC_HOST}/api/mint?type=start`}
        />
        <meta property="fc:frame:button:1" content="Get started" />
      </Head>
      <button
        onClick={async () => {
          await fetch(
            `https://thirdweb-rhhmgamkk.thirdweb-preview.com/api/mint?type=start`,
            {
              method: "POST",
              body: JSON.stringify({
                trustedData: {
                  messageBytes:
                    "0a42080d10c4aa0118c6d1922e20018201320a12687474703a2f2f6578616d706c652e636f6d10011a1a08c4aa0112141fd48ddc9d5910046acfa5e1b91d253763e320c31214230a1291ae8e220bf9173d9090716981402bdd3d18012240f08c907486afe1c3311565b7a27c1f0011c74bd22ba167abe8ba30a35e808cbeae674aef7b74d3161c6186e48e3cc4d843c5ec9dc1dce9c6b71547adcc02c90c28013220196a70ac9847d59e039d0cfcf0cde1adac12f5fb447bb53334d67ab18246306c",
                },
              }),
            },
          );
        }}
      >
        123
      </button>
    </Fragment>
  );
}
