import { useConnectedWallet, useLcdClient } from "@terra-money/wallet-kit";
import React from "react";

export const Ballance = () => {
  const lcd = useLcdClient(); // LCD stands for Light Client Daemon
  const connected = useConnectedWallet();
  const [balance, setBalance] = React.useState("");
  const chainID = "pisco-1"; // or any other mainnet or testnet chainID supported by station (e.g. osmosis-1)

  React.useEffect(() => {
    if (connected) {
      lcd.bank.balance(connected.addresses[chainID]).then(([coins]) => {
        setBalance(coins.toString());
      });
    } else {
      setBalance("");
    }
  }, [connected, lcd]); // useEffect is called when these variables change

  return (
    <div>
      {balance && <p>{balance}</p>}
      {!connected && <p>Wallet not connected!</p>}
    </div>
  );
};
