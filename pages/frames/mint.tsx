import { DarkMode } from "@chakra-ui/react";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { Metadata } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

type GenerateMetaDataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetaDataProps): Promise<Metadata> {
  // read route params
  const id = params.id;

  const fcMetadata: Record<string, string> = {
    "fc:frame": "vNext",
    "fc:frame:post_url": `${process.env["HOST"]}/api/vote?id=${id}`,
    "fc:frame:image": `${process.env["HOST"]}/api/image?id=${id}`,
  };

  return {
    title: "poll.title",
    openGraph: {
      title: "poll.title",
      images: [`/api/image?id=${id}`],
    },
    other: {
      ...fcMetadata,
    },
    metadataBase: new URL(process.env["HOST"] || ""),
  };
}

const FramesMint: ThirdwebNextPage = () => {
  return (
    <>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:post_url" content="api/vote" />
        <meta
          property="fc:frame:image"
          content="https://pbs.twimg.com/profile_images/1580649916686286848/vdNCao2e_400x400.jpg"
        />
        <meta property="fc:frame:button:1" content="Like" />
        <meta property="fc:frame:button:2" content="Recast" />
        <meta property="fc:frame:button:3" content="Follow our account" />
        <meta property="fc:frame:button:4" content="Mint NFT" />
      </Head>
      <p>Like recast</p>
    </>
  );
};

FramesMint.pageId = PageId.FramesMint;

export default FramesMint;
