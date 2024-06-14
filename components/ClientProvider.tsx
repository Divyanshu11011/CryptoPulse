"use client";

import React from "react";
import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig(
  getDefaultConfig({
    alchemyId: "MzUaa0A87yexjd8UKcHm8HIr1f4aghxT",
    walletConnectProjectId: "a8024e8262cb4e7102941a3577b5a5c0",
    appName: "0x Next.js Demo App",
    appDescription: "A Next.js demo app for 0x Swap API and ConnectKit",
  })
);

const queryClient = new QueryClient();

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
