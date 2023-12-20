"use client";

import React from "react";
import {
  getInitialConfig,
  InfoResponse,
  WalletProvider,
} from "@terra-money/wallet-kit";
import { App } from "./App";

export const AppWalletProvider = () => {
  const [defaultNetworks, setDefaultNetworks] = React.useState<
    InfoResponse | undefined
  >();

  React.useEffect(() => {
    getInitialConfig().then((config) => setDefaultNetworks(config));
  }, []);

  if (!defaultNetworks) return <div>Loading...</div>;

  return (
    <WalletProvider defaultNetworks={defaultNetworks}>
      <App />
    </WalletProvider>
  );
};
