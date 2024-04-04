import PayTxFrame from "components/pay/PayTxFrame";
import satori from "satori";
import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";

import path from "path";
import sharp from "sharp";
import { z } from "zod";

const fontPath = path.resolve("src/og-lib/fonts/inter/500.ttf");
const inter500 = readFileSync(fontPath);

const defaultSchema = z.object({
  type: z.literal("default"),
  title: z.string(),
});

const swapSchema = z.object({
  type: z.literal("swap"),
  fromTokenAmount: z.string(),
  toTokenAmount: z.string(),
  fromTokenSymbol: z.string(),
  toTokenSymbol: z.string(),
  fromChain: z.string(),
  toChain: z.string(),
  gasCostUsd: z.string(),
});

const querySchema = z.union([defaultSchema, swapSchema]);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const queryDetails = querySchema.parse(req.query);

  const svg = await satori(<PayTxFrame {...queryDetails} />, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Inter",
        data: inter500,
        weight: 500,
        style: "normal",
      },
    ],
  });

  const pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();

  res.setHeader("Content-Type", "image/png");
  return res.send(pngBuffer);
}
