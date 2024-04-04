import React from "react";

type PayTxFrameProps =
  | {
      type: "swap";
      fromTokenAmount: string;
      toTokenAmount: string;
      fromTokenSymbol: string;
      toTokenSymbol: string;
      fromChain: string;
      toChain: string;
      gasCostUsd: string;
    }
  | {
      type: "default";
      title: string;
    };

const PayTxFrame = (props: PayTxFrameProps) => {
  if (props.type === "swap") {
    const {
      fromTokenAmount,
      toTokenAmount,
      fromTokenSymbol,
      toTokenSymbol,
      fromChain,
      toChain,
      gasCostUsd,
    } = props;

    return (
      <div
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #17417F 0%, #471359 100%)",
          color: "#fff",
        }}
      >
        <div
          // eslint-disable-next-line react/forbid-dom-props
          style={{
            display: "flex",
            alignItems: "center",
            width: "90%",
            height: "45%",
            gap: "13px",
          }}
        >
          <div
            // eslint-disable-next-line react/forbid-dom-props
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              background: "rgba(217, 217, 217, 0.10)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              flex: 1,
              borderRadius: "16px",
              height: "100%",
            }}
          >
            <h1
              // eslint-disable-next-line react/forbid-dom-props
              style={{
                fontSize: "25px",
                marginLeft: "32px",
                marginTop: "32px",
              }}
            >
              You Pay
            </h1>

            <h1
              // eslint-disable-next-line react/forbid-dom-props
              style={{ fontSize: "45px", marginLeft: "32px" }}
            >
              {fromTokenAmount}
            </h1>

            <h1
              // eslint-disable-next-line react/forbid-dom-props
              style={{ fontSize: "25px", marginLeft: "32px", color: "#c4c1de" }}
            >
              {fromTokenSymbol} {fromChain}
            </h1>
          </div>

          <div
            // eslint-disable-next-line react/forbid-dom-props
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "49.038px",
              height: "49.036px",
              borderRadius: "10px",
              background: "rgba(217, 217, 217, 0.10)",
              border: "4px solid rgba(255, 255, 255, 0.10)",
              fontSize: "25px",
            }}
          >
            {`→`}
          </div>

          <div
            // eslint-disable-next-line react/forbid-dom-props
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              height: "100%",
              background: "rgba(217, 217, 217, 0.10)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              flex: 1,
              borderRadius: "16px",
            }}
          >
            <h1
              // eslint-disable-next-line react/forbid-dom-props
              style={{
                fontSize: "25px",
                marginLeft: "32px",
                marginTop: "32px",
              }}
            >
              You Receive
            </h1>

            <h1
              // eslint-disable-next-line react/forbid-dom-props
              style={{ fontSize: "45px", marginLeft: "32px" }}
            >
              {toTokenAmount}
            </h1>

            <h1
              // eslint-disable-next-line react/forbid-dom-props
              style={{ fontSize: "25px", marginLeft: "32px", color: "#c4c1de" }}
            >
              {toTokenSymbol} {toChain}
            </h1>
          </div>
        </div>

        <h1
          // eslint-disable-next-line react/forbid-dom-props
          style={{
            width: "90%",
            fontSize: "18px",
            marginLeft: "32px",
            marginTop: "28px",
            color: "#c4c1de",
            marginBottom: "-32px",
          }}
        >
          Gas Cost {gasCostUsd}
        </h1>
      </div>
    );
  }

  const { title } = props;

  return (
    <div
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #17417F 0%, #471359 100%)",
        color: "#fff",
      }}
    >
      <div
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(217, 217, 217, 0.10)",
          border: "1px solid rgba(255, 255, 255, 0.10)",
          width: "90%",
          height: "90%",
          borderRadius: "16px",
        }}
      >
        <h1
          // eslint-disable-next-line react/forbid-dom-props
          style={{
            fontSize: "56px",
            textAlign: "center",
            maxWidth: "860px",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PayTxFrame;
