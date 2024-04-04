import { createThirdwebClient, defineChain } from "thirdweb";
import { PROD_OR_DEV_URL } from "../constants/rpc";
import { IPFS_GATEWAY_URL } from "./sdk";

export const thirdwebClient = createThirdwebClient({
  secretKey:
    "z8TK3xj5p0v-lFOukm_tizzbZEJlr3UFLkSl-7rZrQjwU3JlZo2T3zgLjnyRg0TaXHXklaQm5aydF-eCO3IwAA",
  config: {
    storage: {
      gatewayUrl: IPFS_GATEWAY_URL,
    },
  },
});

export const defineDashboardChain = (chainId: number) => {
  return defineChain({
    id: chainId,
    rpc: `https://${chainId}.rpc.${PROD_OR_DEV_URL}`,
  });
};
