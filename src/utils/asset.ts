import { Chain } from "wagmi/chains";
import { arbitrum, base, bsc, mainnet, optimism, polygon } from "wagmi/chains";
import { GRUMPY_BLUE, ZOOMER_YELLOW } from "./colors";
import {
  grumpyCatCoinAddress,
  grumpyCatLockboxAdapterAddress,
  zoomerCoinAddress,
} from "../generated";
import { Address, Hex, encodeAbiParameters } from "viem";
import { BUY_GRUMPYCAT_LINK, BUY_ZOOMER_LINK } from "./constants";

export type AssetConfig = {
  chains: Chain[];
  color: string;
  buyLink: string;
};

export const solana: Chain = {
  id: 0,
  name: "Solana",
  nativeCurrency: { name: "SOL", symbol: "SOL", decimals: 8 },
  rpcUrls: {
    default: {
      http: ["https://api.mainnet-beta.solana.com"],
    },
  },
};

export const configByAsset: Record<Asset, AssetConfig> = {
  zoomer: {
    color: ZOOMER_YELLOW,
    chains: [mainnet, base, polygon, bsc, arbitrum, optimism, solana],
    buyLink: BUY_ZOOMER_LINK,
  },
  grumpycat: {
    color: GRUMPY_BLUE,
    chains: [mainnet, polygon, bsc, arbitrum, optimism],
    buyLink: BUY_GRUMPYCAT_LINK,
  },
};

export type Asset = "zoomer" | "grumpycat";

export const getAddressByAsset = (
  asset: Asset,
  originChainId: number
): Address => {
  if (asset === "zoomer") {
    return zoomerCoinAddress[originChainId as keyof typeof zoomerCoinAddress];
  }
  if (asset === "grumpycat") {
    return grumpyCatCoinAddress[
      originChainId as keyof typeof grumpyCatCoinAddress
    ];
  }
  throw new Error(`Unknown asset: ${asset}`);
};

export const getCalldataByAsset = (
  asset: Asset,
  destinationChainId: number,
  walletAddress: Address
): Hex => {
  if (destinationChainId === mainnet.id && asset === "grumpycat") {
    return encodeAbiParameters([{ type: "address" }], [walletAddress]);
  }
  return "0x";
};

export const getRecipientByAsset = (
  asset: Asset,
  destinationChainId: number,
  walletAddress: Address
): Address => {
  if (destinationChainId === mainnet.id && asset === "grumpycat") {
    return grumpyCatLockboxAdapterAddress[mainnet.id];
  }
  return walletAddress;
};
