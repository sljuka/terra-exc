import React from "react";
import { useConnectedWallet, useWallet } from "@terra-money/wallet-kit";
import { Ballance } from "./Ballance";

export const App = () => {
  const connectedWallet = useConnectedWallet();
  const { connect, disconnect, availableWallets } = useWallet();

  return (
    <section>
      <h4>Connect info:</h4>
      {connectedWallet ? (
        <>
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-lg duration-150 hover:bg-red-700 active:shadow-lg"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
          <code>
            <Ballance />
          </code>
        </>
      ) : (
        availableWallets.map(({ id, name, isInstalled }) => (
          <button
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
            onClick={() => connect(id)}
            disabled={!isInstalled}
            key={id}
          >
            Connect {name}
          </button>
        ))
      )}
    </section>
  );
};
