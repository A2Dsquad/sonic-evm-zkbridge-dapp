import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import NiceModal from "@ebay/nice-modal-react";
import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { config } from "./wagmi.ts";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

// 1. Your WalletConnect Cloud project ID
const projectId = "9af0ef13084e0ceebd2862711d6a0e37";

// 2. Create wagmiConfig
const metadata = {
  name: "sentra-bridge",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, sepolia] as const;
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: false,
    socials: [],
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

// Render the app
const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <NiceModal.Provider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </WagmiProvider>
      </NiceModal.Provider>
    </React.StrictMode>,
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
