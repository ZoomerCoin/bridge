import {
  Chain,
  arbitrum,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi";

export const projectId = "296a55745d9880bb16e1386b1b0eb360";

const metadata = {
  name: "Zoomer",
  description: "Zoomer Bridge",
  url: "https://zoomer.money",
  verifyUrl: "https://zoomer.money",
  icons: [
    "https://assets.coingecko.com/coins/images/30894/large/zoooooooooomer.jpg?1696529740",
  ],
};

export const chains: [Chain, ...Chain[]] = [
  mainnet,
  polygon,
  base,
  bsc,
  polygon,
  arbitrum,
  optimism,
];

export const wagmiConfig = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata: { ...metadata }, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});
