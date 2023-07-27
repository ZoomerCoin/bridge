import {
  Box,
  Flex,
  Heading,
  Spacer,
  VStack,
  Input,
  Select,
  Button,
  Code,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useWalletClient } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatEther } from "viem";
import { SdkBase, SdkConfig, create } from "@connext/sdk";
import { erc20ABI } from "wagmi";
import { chainIdToDomain } from "@connext/nxtp-utils";

const chains = [mainnet, polygon, arbitrum];

const zoomer: Record<number, `0x${string}`> = {
  [mainnet.id]: "0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676",
  [polygon.id]: "0xD4CBC6359F75f261cA6f606F4B89a386aeBE1601",
  [arbitrum.id]: "0xD4CBC6359F75f261cA6f606F4B89a386aeBE1601",
};

export default function Home() {
  const [amountIn, setAmountIn] = useState("");
  const [relayerFee, setRelayerFee] = useState("0");
  const [relayerFeeLoading, setRelayerFeeLoading] = useState(false);
  const [connext, setConnext] = useState<SdkBase>();
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const {
    data: balance,
  } = useContractRead({
    address: walletClient?.chain?.id
      ? zoomer[walletClient.chain.id]
      : undefined,
    args: [walletClient?.account?.address!],
    abi: erc20ABI,
    functionName: "balanceOf",
  });

  useEffect(() => {
    const run = async () => {
      const sdkConfig: SdkConfig = {
        signerAddress: walletClient?.account?.address,
        network: "mainnet",
        chains: {
          [chainIdToDomain(mainnet.id)]: {
            providers: ["https://eth.llamarpc.com", "https://1rpc.io/eth"],
          },
          [chainIdToDomain(arbitrum.id)]: {
            providers: [
              "https://1rpc.io/arb",
              "https://arbitrum-one.publicnode.com",
              "https://rpc.ankr.com/arbitrum",
            ],
          },
          // [chainIdToDomain(bsc.id)]: {
          //   providers: [
          //     "https://bscrpc.com",
          //     "https://bsc-dataseed2.ninicoin.io",
          //   ],
          // },
          [chainIdToDomain(polygon.id)]: {
            providers: [
              "https://polygon.llamarpc.com",
              "https://polygon.rpc.blxrbdn.com",
              "https://polygon-bor.publicnode.com",
            ],
          },
        },
      };
      const { sdkBase } = await create(sdkConfig);
      setConnext(sdkBase);
    };
    run();
  }, [walletClient?.account?.address]);

  const handleXCall = async () => {
    console.log(`amountIn: ${amountIn}`);
  };

  const getRelayerFee = async (destinationChain: string) => {
    console.log("getting relayer fee: ", destinationChain);
    setRelayerFeeLoading(true);
    const fee = await connext?.estimateRelayerFee({
      originDomain: chainIdToDomain(walletClient!.chain.id),
      destinationDomain: chainIdToDomain(+destinationChain),
    });
    console.log("relayer fee: ", fee);
    setRelayerFeeLoading(false);
    setRelayerFee((fee ?? "0").toString());
  };

  return (
    <>
      <time dateTime="2016-10-25" suppressHydrationWarning />
      <VStack spacing={4} align="stretch" p={4}>
        <Box h="40px">
          <Flex>
            <Box>
              <Heading size={"lg"}>
                <a href="https://zoomer.money">/TAKE_ME_HOME</a>
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <ConnectButton />
            </Box>
          </Flex>
        </Box>
        {!isConnected ? (
          <Box>
            <Heading>/CONNECT_YO_WALLET</Heading>
          </Box>
        ) : (
          <Flex>
            <Spacer />
            <Flex direction={"column"} borderColor={"black"}>
              <Box pb={4} pt={4}>
                <Heading>/AHH_WE_BRIDGING</Heading>
              </Box>
              <Box>
                <Input
                  w="450px"
                  value={amountIn}
                  onChange={async (event) => {
                    setAmountIn(event.target.value);
                  }}
                  focusBorderColor="black"
                  variant="flushed"
                  placeholder="amount to bridge"
                  size="lg"
                />
              </Box>
              <Box pb={4} pt={4}>
                <Flex>
                  <Code colorScheme="yellow">
                    Balance: {formatEther(balance ?? BigInt(0))} ZOOMER
                  </Code>
                  <Button
                    variant="outline"
                    borderColor="black"
                    size="xs"
                    onClick={() => {
                      setAmountIn(formatEther(balance ?? BigInt(0)));
                    }}
                    ml={2}
                  >
                    /max
                  </Button>
                </Flex>
              </Box>
              <Box pb={4} pt={4}>
                <Select
                  placeholder="destination chain"
                  variant={"flushed"}
                  size="sm"
                  w="250px"
                  focusBorderColor="black"
                  onChange={async (event) => {
                    await getRelayerFee(event.target.value);
                  }}
                >
                  {chains
                    .filter((chain) => chain.id !== walletClient?.chain.id)
                    .map((chain) => {
                      return (
                        <option key={chain.id} value={chain.id}>
                          {chain.name}
                        </option>
                      );
                    })}
                </Select>
              </Box>
              <Box pb={4}>
                <Code colorScheme="yellow">
                  Relayer fee: {relayerFeeLoading ? "..." : formatEther(BigInt(relayerFee))}{" "}
                  {walletClient?.chain.id
                    ? chains.find(
                        (chain) => chain.id === walletClient?.chain.id
                      )?.nativeCurrency.symbol
                    : "???"}
                </Code>
              </Box>
              <Box pb={4} pt={4}>
                <Button
                  variant="outline"
                  borderColor="black"
                  isDisabled={BigInt(relayerFee) == BigInt(0)}
                  onClick={handleXCall}
                >
                  /LEZ_FUCKING_GO
                </Button>
              </Box>
            </Flex>
            <Spacer />
          </Flex>
        )}
      </VStack>
    </>
  );
}
