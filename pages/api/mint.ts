import { Warpcast } from "classes/Warpcast";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

const requestBodyWarpcastSchema = z.object({
  trustedData: z.object({
    messageBytes: z.string().min(5),
  }),
});

const requestQuerySchema = z.object({
  type: z.union([z.literal("start"), z.literal("recast"), z.literal("mint")]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return res.status(200).send(
    `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Recast Post</title>
      <meta property="fc:frame" content="vNext" />
      <meta
        property="fc:frame:image"
        content={${getAbsoluteUrl()}/assets/og-image/marketplace-solutions.png}
      />
      <meta
        property="fc:frame:post_url"
        content={${getAbsoluteUrl()}/api/mint?type=recast}
      />
      <meta property="fc:frame:button:1" content="Recast to mint NFT" />
    </head>
    <body>
      <p>Recast to mint NFT</p>
    </body>
  </html>
`,
  );

  if (req.method !== "POST") {
    return res.status(400).send({ error: "invalid method" });
  }

  res.setHeader("Access-Control-Allow-Credentials", "false");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
  );

  try {
    const { type } = requestQuerySchema.parse(req.query);

    const { trustedData } = requestBodyWarpcastSchema.parse(req.body);

    const action = await Warpcast.validateMessage(trustedData.messageBytes);

    if (type === "start") {
      return res.status(200).send(
        `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Recast Post</title>
          <meta property="fc:frame" content="vNext" />
          <meta
            property="fc:frame:image"
            content={${getAbsoluteUrl()}/assets/og-image/marketplace-solutions.png}
          />
          <meta
            property="fc:frame:post_url"
            content={${getAbsoluteUrl()}/api/mint?type=recast}
          />
          <meta property="fc:frame:button:1" content="Recast to mint NFT" />
        </head>
        <body>
          <p>Recast to mint NFT</p>
        </body>
      </html>
    `,
      );
    }

    if (type === "recast") {
      const hasRecasted = await Warpcast.hasRecasted(action.interactor.fid);

      if (!hasRecasted) {
        return res.status(500).send({ error: "You haven't recasted the cast" });
      }

      return res.status(200).send(
        `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mint NFT</title>
          <meta property="fc:frame" content="vNext" />
          <meta
            property="fc:frame:image"
            content={${getAbsoluteUrl()}/assets/og-image/marketplace-solutions.png}
          />
          <meta
            property="fc:frame:post_url"
            content={${getAbsoluteUrl()}/api/mint?type=starter}
          />
          <meta property="fc:frame:button:1" content="Recast to mint NFT" />
        </head>
        <body>
          <p>Mint NFT</p>
        </body>
      </html>
    `,
      );
    }

    if (type === "mint") {
      return res.status(200).send(
        `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vote Recorded</title>
          <meta property="fc:frame" content="vNext" />
          <meta
            property="fc:frame:image"
            content={${getAbsoluteUrl()}/assets/og-image/marketplace-solutions.png}
          />
          <meta
            property="fc:frame:post_url"
            content={${getAbsoluteUrl()}/api/mint?type=mint}
          />
          <meta property="fc:frame:button:1" content="Mint NFT" />
        </head>
        <body>
          <p>Recast to mint NFT</p>
        </body>
      </html>
    `,
      );
    }
  } catch (err) {
    Sentry.captureMessage(
      `Failed to mint with frames. Error: ${(err as any).message}`,
    );
    return res.status(500).send({ error: "Something went wrong" });
  }
}
