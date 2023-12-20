import { MsgSend } from "@terra-money/feather.js";
import {
  PostResponse,
  useConnectedWallet,
  useWallet,
} from "@terra-money/wallet-kit";
import React, { useCallback } from "react";

const TEST_TO_ADDRESS = "terra1p8pl9ggn42gejamps46zmjdmktdg6t0x499p27"; // my second test wallet

export const Send = () => {
  const [txResult, setTxResult] = React.useState<PostResponse | null>(null);
  const [txError, setTxError] = React.useState("");

  const connectedWallet = useConnectedWallet();
  const wallet = useWallet();
  const chainID = "pisco-1";

  const testTx = useCallback(async () => {
    if (!connectedWallet) {
      return;
    }

    if (connectedWallet.network === "mainnet") {
      alert(`Please only execute this example on Testnet`);
      return;
    }

    try {
      const transactionMsg = {
        chainID,
        msgs: [
          new MsgSend(connectedWallet.addresses[chainID], TEST_TO_ADDRESS, {
            uluna: 1e6, // parse baseAsset from network object and use here (e.g.`[baseAsset]`)
          }),
        ],
      };

      const tx = await wallet.post(transactionMsg);
      setTxResult(tx);
    } catch (error) {
      setTxError(
        "Error: " + (error instanceof Error ? error.message : String(error))
      );
    }
  }, [connectedWallet, wallet]);

  return (
    <>
      {connectedWallet && !txResult && !txError && (
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
          onClick={testTx}
        >
          Send 1 Luna to {TEST_TO_ADDRESS}
        </button>
      )}

      {txResult && <>{JSON.stringify(txResult, null, 2)}</>}
      {txError && <pre>{txError}</pre>}
    </>
  );
};
