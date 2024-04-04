export const abi = [
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "clientId", type: "bytes32" },
          { internalType: "bytes32", name: "transactionId", type: "bytes32" },
          { internalType: "address", name: "tokenAddress", type: "address" },
          { internalType: "uint256", name: "tokenAmount", type: "uint256" },
          {
            internalType: "uint256",
            name: "expirationTimestamp",
            type: "uint256",
          },
          {
            components: [
              { internalType: "bytes32", name: "clientId", type: "bytes32" },
              {
                internalType: "address payable",
                name: "payoutAddress",
                type: "address",
              },
              { internalType: "uint256", name: "feeBPS", type: "uint256" },
            ],
            internalType: "struct PaymentsGateway.PayoutInfo[]",
            name: "payouts",
            type: "tuple[]",
          },
          {
            internalType: "address payable",
            name: "forwardAddress",
            type: "address",
          },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct PaymentsGateway.PayRequest",
        name: "req",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "initiateTokenPurchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
