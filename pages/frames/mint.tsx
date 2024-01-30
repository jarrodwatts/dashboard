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
          content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/assets/og-image/marketplace-solutions.png`}
        />
        <meta
          property="fc:frame:post_url"
          content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/mint?type=start`}
        />
        <meta property="fc:frame:button:1" content="Get started" />
      </Head>
    </Fragment>
  );
}
