import { useState } from "react";
import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import PriceView from "@/components/ui/PriceView";
import QuoteView from "@/components/ui/QuoteView";
import { useAccount } from "wagmi";


const config = createConfig(
  getDefaultConfig({
    alchemyId: "MzUaa0A87yexjd8UKcHm8HIr1f4aghxT",
    walletConnectProjectId: "a8024e8262cb4e7102941a3577b5a5c0",
    appName: "0x Next.js Demo App",
    appDescription: "A Next.js demo app for 0x Swap API and ConnectKit",
  })
);

export default function TokenSwap() {
  const [tradeDirection, setTradeDirection] = useState("sell");
  const [finalize, setFinalize] = useState(false);
  const [price, setPrice] = useState<PriceResponse | undefined>();
  const [quote, setQuote] = useState();
  const { address } = useAccount();

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
          {finalize && price ? (
            <QuoteView
              takerAddress={address}
              price={price}
              quote={quote}
              setQuote={setQuote}
            />
          ) : (
            <PriceView
              takerAddress={address}
              price={price}
              setPrice={setPrice}
              setFinalize={setFinalize}
            />
          )}
        </main>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
