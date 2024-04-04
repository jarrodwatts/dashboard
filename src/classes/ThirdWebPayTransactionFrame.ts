import { createThirdwebClient, getBuyWithCryptoQuote } from "thirdweb";
import { IPFS_GATEWAY_URL } from "lib/sdk";
import {
  FrameMetadataType,
  FrameValidationData,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { z } from "zod";
import { DASHBOARD_THIRDWEB_SECRET_KEY } from "constants/rpc";
import Big from "big.js";
import { getFarcasterAccountAddress } from "utils/tx-frame";
import { abi } from "lib/pay-abi-tx-frame";

export const thirdwebClient = createThirdwebClient({
  secretKey: "<secret_key>",
  config: {
    storage: {
      gatewayUrl: IPFS_GATEWAY_URL,
    },
  },
});

interface ComputeTransactionDataParameters {
  fromAddress: string;
  amount: string;
}

const stringNumberSchema = z
  .string()
  .refine((stringNumber) => !isNaN(stringNumber as unknown as number), {
    message: "The string must be a valid number",
  });

const validQuerySchema = z.union([
  z.literal("confirm"),
  z.literal("compute-transaction"),
  z.literal("tx"),
]);

export class ThirdWebPayTransactionFrame {
  public static async getTransactionData({
    fromAddress,
    amount,
  }: ComputeTransactionDataParameters) {
    const quote = await getBuyWithCryptoQuote({
      client: thirdwebClient,
      fromAddress,
      fromChainId: 8453,
      // Base ETH (native token address)
      fromTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      fromAmount: amount,
      toChainId: 8453,
      // $DEGEN token contract address
      toTokenAddress: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
    });

    return {
      chainId: "eip155:8453",
      method: "eth_sendTransaction",
      params: {
        abi,
        to: quote.swapDetails.toAddress,
        data: quote.transactionRequest.data,
        value: "100000000000000000000",
      },
    };
  }

  public static getFormattedToAmount(amount: string) {
    const _amount = stringNumberSchema.parse(amount);
    const formattedToAmount = new Big(_amount).round(4).toString();

    return formattedToAmount;
  }

  public static getValidTypeQuery = (type: string) => {
    return validQuerySchema.parse(type);
  };

  public static htmlResponse = (frameMetaData: FrameMetadataType) => {
    return getFrameHtmlResponse(frameMetaData);
  };
}
