import type { Address } from "viem";
import ZKBridge from "./ZKBridge.json";
import { mainnet, sepolia } from "wagmi/chains";

export const ZKBridgeAbi = ZKBridge.abi;

export const ZKBridgeAddresses: Record<number, Address> = {
  [mainnet.id]: import.meta.env.VITE_MAINNET_ZK_BRIDGE_ADDRESS,
  [sepolia.id]: import.meta.env.VITE_SEPOLIA_ZK_BRIDGE_ADDRESS,
};
