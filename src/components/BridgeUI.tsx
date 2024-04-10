"use client";
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
  Text,
  CardBody,
  Card,
  useColorMode,
  Modal,
  Link,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  useColorModeValue,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useAccount,
  useWriteContract,
  usePublicClient,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWalletClient,
} from "wagmi";
//@ts-ignore
import { switchChain } from "@wagmi/core";
import { arbitrum, base, bsc, mainnet, optimism, polygon } from "wagmi/chains";
import {
  Address,
  Hash,
  Hex,
  PublicClient,
  encodeAbiParameters,
  encodeFunctionData,
  erc20Abi,
  formatEther,
  parseEther,
} from "viem";
import { SdkBase, SdkConfig, SdkUtils, create } from "@connext/sdk-core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { chainIdToDomain } from "@connext/nxtp-utils";

import { useDebounce } from "../hooks/useDebounce";
import {
  cciPxErc20BridgeAbi,
  cciPxErc20BridgeAddress,
  useReadErc20BalanceOf,
  useReadZoomerXerc20OldBalanceOf,
  zoomerCoinAddress,
  zoomerXerc20LockboxBaseAbi,
  zoomerXerc20LockboxBaseAddress,
} from "../generated";
import {
  Asset,
  configByAsset,
  getAddressByAsset,
  solana,
} from "../utils/asset";
import { wagmiConfig } from "../wagmi";
import { ZOOMER_YELLOW } from "../utils/colors";
import { Bridge, bridgeConfig, getApproveToByBridge } from "../utils/bridge";

type BridgeUIProps = {
  asset: Asset;
  setAsset: Dispatch<SetStateAction<Asset>>;
};

const CONNEXT_LOCKBOX_ADAPTER_MAINNET =
  "0x45BF3c737e57B059a5855280CA1ADb8e9606AC68";

const updateApprovals = async (
  bridge: Bridge,
  amount: string,
  chainId: number,
  account: Address,
  pubClient: PublicClient,
  connext: { sdkBase: SdkBase; sdkUtils: SdkUtils }
): Promise<boolean> => {
  if (bridge === "connext") {
    if (!chainId) {
      throw new Error("chainId is undefined");
    }
    console.log(
      "approveIfNeeded: ",
      chainIdToDomain(chainId).toString(),
      zoomerCoinAddress[chainId as keyof typeof zoomerCoinAddress],
      parseEther(amount)
    );
    const res = await connext!.sdkBase.approveIfNeeded(
      chainIdToDomain(chainId).toString(),
      zoomerCoinAddress[chainId as keyof typeof zoomerCoinAddress],
      parseEther(amount).toString(),
      true
    );
    console.log("res: ", res);
    console.log("approvalNeeded: ", !!res);
    return !!res;
  } else {
    const allowance = await pubClient.readContract({
      abi: erc20Abi,
      address: zoomerCoinAddress[chainId as keyof typeof zoomerCoinAddress],
      functionName: "allowance",
      args: [account, getApproveToByBridge(bridge, chainId)],
    });
    if (allowance! < parseEther(amount)) {
      console.log("approval needed: ", allowance, parseEther(amount));
      return true;
    } else {
      console.log("approval not needed: ", allowance, parseEther(amount));
      return false;
    }
  }
};

const getRelayerFee = async (
  bridge: Bridge,
  walletChain: number,
  destinationChain: number,
  amount: bigint,
  pubClient: PublicClient,
  connext: { sdkBase: SdkBase; sdkUtils: SdkUtils }
): Promise<string> => {
  let fee: string;
  console.log("******* getRelayerFee *******    ", amount.toString());
  if (bridge === "connext") {
    console.log("getting relayer fee: ", destinationChain);
    const _fee = await connext.sdkBase.estimateRelayerFee({
      originDomain: chainIdToDomain(walletChain).toString(),
      destinationDomain: chainIdToDomain(destinationChain).toString(),
    });
    fee = (_fee ?? "N/A").toString();
  } else if (bridge === "ccip") {
    let _fee = await pubClient?.readContract({
      abi: cciPxErc20BridgeAbi,
      address:
        cciPxErc20BridgeAddress[
          walletChain as keyof typeof cciPxErc20BridgeAddress
        ],
      functionName: "getFee",
      args: [+destinationChain, BigInt(amount), false],
    });
    fee = (_fee ?? "N/A").toString();
  } else {
    fee = "0";
  }
  console.log("relayer fee: ", fee);
  return fee;
};

export const BridgeUI = ({ asset, setAsset }: BridgeUIProps) => {
  const { data: walletClient } = useWalletClient();
  const { colorMode } = useColorMode();
  const [_amountIn, setAmountIn] = useState("");
  const amountIn = useDebounce(_amountIn, 500);
  const [relayerFee, setRelayerFee] = useState("0");
  const [relayerFeeLoading, setRelayerFeeLoading] = useState(false);
  const [approvalNeeded, setApprovalNeeded] = useState(true);
  const [destinationChain, setDestinationChain] = useState<
    number | undefined
  >();
  const [originChain, setOriginChain] = useState<number | undefined>();
  const [bridge, setBridge] = useState<Bridge>();
  const [connext, setConnext] = useState<
    { sdkBase: SdkBase; sdkUtils: SdkUtils } | undefined
  >();
  const { isConnected } = useAccount();
  const pubClient = usePublicClient();

  const urlParams = useSearchParams();
  const _asset = urlParams.get("asset");
  if (_asset) {
    setAsset(_asset as Asset);
  }

  useEffect(() => {
    const run = async () => {
      if (!walletClient?.account?.address) {
        return;
      }
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
          [chainIdToDomain(polygon.id)]: {
            providers: [
              "https://polygon.llamarpc.com",
              "https://polygon.rpc.blxrbdn.com",
              "https://polygon-bor.publicnode.com",
            ],
          },
          [chainIdToDomain(bsc.id)]: {
            providers: [
              "https://bsc.llamarpc.com",
              "https://bsc-dataseed.binance.org",
              "https://bsc-dataseed1.defibit.io",
              "https://bsc-dataseed1.ninicoin.io",
              "https://bsc-dataseed2.defibit.io",
              "https://bsc-dataseed3.defibit.io",
            ],
          },
          [chainIdToDomain(optimism.id)]: {
            providers: [
              "https://optimism.llamarpc.com",
              "https://mainnet.optimism.io",
              "https://optimism.gateway.tenderly.co",
              "https://rpc.optimism.gateway.fm",
              "https://optimism.drpc.org",
            ],
          },
        },
      };
      const { sdkBase, sdkUtils } = await create(sdkConfig);
      setConnext({ sdkBase, sdkUtils });
      setOriginChain(walletClient?.chain.id);
      setDestinationChain(
        configByAsset[asset].chains.filter(
          (chain) =>
            chain.id !== walletClient?.chain.id && chain.id !== solana.id
        )[Math.floor(Math.random() * configByAsset[asset].chains.length)].id
      );
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletClient?.account?.address]);

  useEffect(() => {
    const run = async () => {
      if (
        !walletClient?.account?.address ||
        !amountIn ||
        !walletClient?.chain.id ||
        !pubClient ||
        !connext ||
        !bridge ||
        !destinationChain
      ) {
        console.log(
          "walletClient?.account?.address: ",
          walletClient?.account?.address
        );
        console.log("amountIn: ", amountIn);
        console.log("walletClient?.chain.id: ", walletClient?.chain.id);
        console.log("pubClient: ", !!pubClient);
        console.log("connext: ", !!connext);
        console.log("bridge: ", bridge);
        console.log("destinationChain: ", destinationChain);
        console.log("MISSING STUFF");
        return;
      }
      await Promise.all([
        (async () => {
          const approvalNeeded = await updateApprovals(
            bridge,
            amountIn,
            walletClient.chain.id,
            walletClient.account.address,
            pubClient,
            connext
          );
          setApprovalNeeded(approvalNeeded);
        })(),
        (async () => {
          setRelayerFeeLoading(true);
          const fee = await getRelayerFee(
            bridge,
            walletClient.chain.id,
            destinationChain,
            parseEther(amountIn),
            pubClient,
            connext
          );
          setRelayerFee(fee);
          setRelayerFeeLoading(false);
        })(),
      ]);
    };
    run();
  }, [
    destinationChain,
    amountIn,
    bridge,
    pubClient,
    walletClient?.account?.address,
    walletClient?.chain.id,
    connext,
  ]);

  return (
    <>
      <Card
        bg={
          colorMode === "light" ? configByAsset[asset].color : "blackAlpha.100"
        }
        textColor={colorMode === "light" ? "black" : configByAsset[asset].color}
        borderColor={
          colorMode === "light" ? "blackAlpha.400" : configByAsset[asset].color
        }
        variant={"outline"}
        mt={4}
      >
        <CardBody>
          <VStack spacing={4} align="stretch" p={4} pb={0}>
            {!isConnected ||
            !walletClient?.account?.address ||
            !walletClient?.chain?.id ? (
              <Flex>
                <Spacer />
                <Box>{/* <ConnectButton label="/CONNECT_WALLET" /> */}</Box>
                <Spacer />
              </Flex>
            ) : (
              <Flex direction={"column"}>
                <Box pb={4} pt={4}>
                  <Heading>/AHH_WE_BRIDGING</Heading>
                </Box>
                <BridgeDescription />
                <Box pt={4} />
                <CheckOldZoomer address={walletClient.account.address} />
                <Box pt={4}>
                  <SelectAsset asset={asset} setAsset={setAsset} />
                </Box>
                <Flex pb={4} pt={4} width="100%" flexWrap="wrap">
                  <SelectOriginChain
                    asset={asset}
                    originChain={originChain}
                    setOriginChain={setOriginChain}
                    walletChain={walletClient.chain.id}
                  />
                  <Spacer />
                  <SelectDestinationChain
                    asset={asset}
                    destinationChain={destinationChain}
                    setDestinationChain={setDestinationChain}
                    walletChain={walletClient.chain.id}
                  />
                </Flex>
                {originChain === solana.id || destinationChain === solana.id ? (
                  <SolanaDescription />
                ) : (
                  <>
                    <Box pt={4}>
                      <SelectBridge
                        bridge={bridge}
                        setBridge={setBridge}
                        originChain={originChain}
                        destinationChain={destinationChain}
                      />
                    </Box>
                    <Box pt={4}>
                      <AmountInInput
                        amountIn={_amountIn}
                        setAmountIn={setAmountIn}
                        asset={asset}
                        destinationChain={destinationChain}
                      />
                    </Box>
                    <Box pb={4} pt={4}>
                      <AmountDisplay
                        setAmountIn={setAmountIn}
                        walletAddress={walletClient!.account!.address!}
                        asset={asset}
                        walletChain={walletClient!.chain!.id!}
                      />
                    </Box>
                    <Box pb={4}>
                      <RelayerFee
                        asset={asset}
                        relayerFee={relayerFee}
                        relayerFeeLoading={relayerFeeLoading}
                        walletChain={walletClient.chain.id}
                      />
                    </Box>

                    <Box pb={2} pt={4}>
                      {!connext || !destinationChain || !relayerFee ? (
                        <Button
                          isDisabled={true}
                          variant="outline"
                          backgroundColor={
                            colorMode === "light"
                              ? "black"
                              : configByAsset[asset].color
                          }
                          color={
                            colorMode === "light"
                              ? configByAsset[asset].color
                              : "black"
                          }
                          width={"100%"}
                        >
                          CHOOSE DESTINATION
                        </Button>
                      ) : (
                        <ActionButtons
                          amountIn={amountIn}
                          connext={connext}
                          destinationChain={destinationChain}
                          relayerFee={relayerFee}
                          walletAddress={walletClient.account.address}
                          walletChain={walletClient.chain.id}
                          approvalNeeded={approvalNeeded}
                          setApprovalNeeded={setApprovalNeeded}
                          asset={asset}
                          bridge={bridge}
                        />
                      )}
                    </Box>

                    {destinationChain === base.id ? (
                      <Text>bridging to base will take up to 10 min</Text>
                    ) : walletClient.chain.id === base.id ? (
                      <Text>
                        routes from base to other chains will be available soon!
                      </Text>
                    ) : (
                      <Text>
                        bridging will take up to 2 hours. check your wallet
                        later!
                      </Text>
                    )}
                  </>
                )}
              </Flex>
            )}

            {/* <Flex>
              <Spacer />
              <Image
                src={
                  asset === "zoomer"
                    ? "/poweredzoomer.png"
                    : "/poweredgrumpy.png"
                }
                alt="Powered By Zoomer"
                height={109}
                width={156}
              />
              <Spacer />
            </Flex> */}
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

type SelectAssetProps = {
  asset: Asset;
  setAsset: Dispatch<SetStateAction<Asset>>;
};
const SelectAsset = ({ asset, setAsset }: SelectAssetProps) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const pathname = usePathname();
  const handleChangeAsset = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("event.target.value: ", event.target.value);
    setAsset(event.target.value as Asset);
    router.replace(`${pathname}?asset=${event.target.value}`);
  };

  return (
    <Select
      size="lg"
      onChange={handleChangeAsset}
      value={asset}
      borderColor={
        colorMode === "light" ? "blackAlpha.400" : configByAsset[asset].color
      }
    >
      <option value="zoomer">ZOOMER</option>
    </Select>
  );
};

type SelectBridgeProps = {
  originChain?: number;
  destinationChain?: number;
  bridge: Bridge | undefined;
  setBridge: Dispatch<SetStateAction<Bridge | undefined>>;
};
const SelectBridge = ({
  bridge,
  setBridge,
  originChain,
  destinationChain,
}: SelectBridgeProps) => {
  const { colorMode } = useColorMode();
  const handleChangeBridge = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("event.target.value: ", event.target.value);
    setBridge(event.target.value as Bridge);
  };

  const bridges = useMemo(
    () =>
      originChain && destinationChain
        ? Object.entries(bridgeConfig)
            .filter(([_, bridgeConfig]) => {
              return (
                bridgeConfig.origin.includes(originChain) &&
                bridgeConfig.destination.includes(destinationChain)
              );
            })
            .map(([bridge, bridgeConfig]) => {
              return { bridgeConfig, bridge };
            })
        : [],
    [destinationChain, originChain]
  );

  useEffect(() => {
    setBridge(bridges[0]?.bridge as Bridge);
  }, [bridges, setBridge]);

  return (
    <FormControl>
      <FormLabel>Bridge Type</FormLabel>
      <Select
        size="lg"
        onChange={handleChangeBridge}
        value={bridge}
        borderColor={colorMode === "light" ? "blackAlpha.400" : ZOOMER_YELLOW}
      >
        {bridges.map((bridge, index) => {
          return (
            <option value={bridge.bridge} key={index}>
              {bridge.bridgeConfig.displayName}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

type AmountInProps = {
  amountIn: string;
  setAmountIn: Dispatch<SetStateAction<string>>;
  asset: Asset;
  destinationChain?: number;
};
const AmountInInput = ({
  amountIn,
  setAmountIn,
  asset,
  destinationChain,
}: AmountInProps) => {
  const { colorMode } = useColorMode();

  const handleAmountInChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setAmountIn(event.target.value);
  };

  return (
    <Box>
      <Input
        w="100%"
        isDisabled={!destinationChain}
        value={amountIn}
        onChange={handleAmountInChange}
        focusBorderColor="black"
        variant="outline"
        _placeholder={{
          opacity: 1,
          color:
            colorMode === "light"
              ? "blackAlpha.900"
              : configByAsset[asset].color,
        }}
        placeholder="amount to bridge"
        size="md"
        borderColor={
          colorMode === "light" ? "blackAlpha.400" : configByAsset[asset].color
        }
      />
    </Box>
  );
};

type AmountDisplayProps = {
  walletAddress: Address;
  walletChain: number;
  setAmountIn: Dispatch<SetStateAction<string>>;
  asset: Asset;
};
const AmountDisplay = ({
  walletChain,
  walletAddress,
  setAmountIn,
  asset,
}: AmountDisplayProps) => {
  const { data: balance, isSuccess: isSuccessBalance } = useReadErc20BalanceOf({
    address: getAddressByAsset(asset, walletChain),
    args: [walletAddress],
  });
  return (
    <Flex direction="column">
      <Flex pb={2}>
        <Code width={400}>
          Balance: {isSuccessBalance ? formatEther(balance!) : "..."}{" "}
          {asset.toUpperCase()}
        </Code>
        <Button
          variant="outline"
          borderColor="black"
          size="xs"
          isDisabled={!isSuccessBalance}
          onClick={() => {
            setAmountIn(formatEther(balance!));
          }}
          ml={2}
        >
          /max
        </Button>
      </Flex>
    </Flex>
  );
};

type SelectOriginChainProps = {
  walletChain: number;
  asset: Asset;
  setOriginChain: Dispatch<SetStateAction<number | undefined>>;
  originChain?: number;
};
const SelectOriginChain = ({
  asset,
  setOriginChain,
  originChain,
}: SelectOriginChainProps) => {
  const { colorMode } = useColorMode();

  const handleSwitchOriginChain = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setOriginChain(+event.target.value);
    if (+event.target.value !== solana.id) {
      await switchChain(wagmiConfig, {
        chainId: +event.target.value,
      });
    }
  };

  return (
    <VStack>
      <Heading size={"md"}>From</Heading>
      <Select
        placeholder="origin chain"
        variant="outline"
        size="sm"
        w="250px"
        borderColor={
          colorMode === "light" ? "blackAlpha.400" : configByAsset[asset].color
        }
        value={originChain}
        onChange={handleSwitchOriginChain}
      >
        {configByAsset[asset].chains.map((chain) => {
          return (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          );
        })}
      </Select>
    </VStack>
  );
};

type SelectDestinationChainProps = {
  destinationChain: number | undefined;
  setDestinationChain: Dispatch<SetStateAction<number | undefined>>;
  walletChain: number;
  asset: Asset;
};
const SelectDestinationChain = ({
  destinationChain,
  walletChain,
  setDestinationChain,
  asset,
}: SelectDestinationChainProps) => {
  const { colorMode } = useColorMode();

  const handleSwitchDestinationChain = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setDestinationChain(+event.target.value);
  };

  return (
    <VStack>
      <Heading size={"md"}>To</Heading>
      <Select
        placeholder="destination chain"
        variant="outline"
        size="sm"
        w="250px"
        borderColor={
          colorMode === "light" ? "blackAlpha.400" : configByAsset[asset].color
        }
        value={destinationChain}
        onChange={handleSwitchDestinationChain}
      >
        {configByAsset[asset].chains
          .filter((chain) => {
            return chain.id !== walletChain;
          })
          .map((chain) => {
            return (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            );
          })}
      </Select>
    </VStack>
  );
};

type RelayerFeeProps = {
  relayerFee: string;
  relayerFeeLoading: boolean;
  walletChain: number;
  asset: Asset;
};
const RelayerFee = ({
  relayerFeeLoading,
  walletChain,
  relayerFee,
  asset,
}: RelayerFeeProps) => {
  return (
    <Code>
      Relayer fee: {relayerFeeLoading ? "..." : formatEther(BigInt(relayerFee))}{" "}
      {walletChain
        ? configByAsset[asset].chains.find((chain) => chain.id === walletChain)
            ?.nativeCurrency.symbol
        : "???"}
    </Code>
  );
};

type ActionButtonsProps = {
  amountIn: string;
  destinationChain: number;
  walletChain: number;
  walletAddress: Address;
  connext: { sdkBase: SdkBase; sdkUtils: SdkUtils };
  relayerFee: string;
  approvalNeeded: boolean;
  setApprovalNeeded: Dispatch<SetStateAction<boolean>>;
  asset: Asset;
  bridge: Bridge | undefined;
};
const ActionButtons = ({
  amountIn,
  destinationChain,
  walletChain,
  connext,
  relayerFee,
  walletAddress,
  approvalNeeded,
  setApprovalNeeded,
  asset,
  bridge,
}: ActionButtonsProps) => {
  return (
    <Flex>
      {approvalNeeded ? (
        <ApproveButton
          amountIn={amountIn}
          approvalNeeded={approvalNeeded}
          connext={connext}
          setApprovalNeeded={setApprovalNeeded}
          walletChain={walletChain}
          asset={asset}
          bridge={bridge}
        />
      ) : (
        <BridgeButton
          amountIn={amountIn}
          connext={connext}
          destinationChain={destinationChain}
          relayerFee={relayerFee}
          walletAddress={walletAddress}
          walletChain={walletChain}
          asset={asset}
          bridge={bridge}
        />
      )}
    </Flex>
  );
};

type ApproveButtonProps = {
  amountIn: string;
  walletChain: number;
  connext: { sdkBase: SdkBase; sdkUtils: SdkUtils };
  approvalNeeded: boolean;
  setApprovalNeeded: Dispatch<SetStateAction<boolean>>;
  asset: Asset;
  bridge: Bridge | undefined;
};
const ApproveButton = ({
  amountIn,
  walletChain,
  connext,
  approvalNeeded,
  setApprovalNeeded,
  asset,
  bridge,
}: ApproveButtonProps) => {
  const [approvalLoading, setApprovalLoading] = useState(false);
  const { sendTransactionAsync } = useSendTransaction();
  const [txHash, setTxHash] = useState<Hash | undefined>();
  const { isLoading } = useWaitForTransactionReceipt({ hash: txHash });
  const { colorMode } = useColorMode();
  const toast = useToast();
  if (isLoading !== approvalLoading) {
    setApprovalLoading(isLoading);
  }

  const { writeContractAsync: approveWrite } = useWriteContract();

  const handleApprove = async (infinite: boolean) => {
    setApprovalLoading(true);
    try {
      let tx: Hash;
      if (bridge === "connext") {
        console.log(
          "approveIfNeeded: ",
          chainIdToDomain(walletChain).toString(),
          getAddressByAsset(asset, walletChain),
          parseEther(amountIn).toString(),
          infinite
        );
        const res = await connext!.sdkBase.approveIfNeeded(
          chainIdToDomain(walletChain).toString(),
          getAddressByAsset(asset, walletChain),
          parseEther(amountIn).toString(),
          infinite
        );
        if (!res) {
          console.log("approval not needed");
          setApprovalNeeded(false);
          return;
        }
        console.log("res: ", res);
        const data = await sendTransactionAsync({
          to: res.to! as Address,
          value: BigInt(0),
          data: res.data! as Hex,
        });
        tx = data;
      } else {
        if (!approveWrite) {
          throw new Error("approveWrite is undefined");
        }
        const data = await approveWrite({
          chainId: walletChain,
          abi: erc20Abi,
          address: getAddressByAsset(asset, walletChain),
          functionName: "approve",
          args: [
            getApproveToByBridge(bridge!, walletChain)!,
            infinite
              ? BigInt(
                  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                )
              : parseEther(amountIn),
          ],
        });
        tx = data;
      }
      setApprovalLoading(true);
      setTxHash(tx);
      setApprovalLoading(false);
      setApprovalNeeded(false);
    } catch (e) {
      setApprovalLoading(false);
      toast({
        title: "Approval Error",
        description: (e as Error).message,
        status: "error",
      });
      console.log("error: ", e);
    }
  };

  return (
    <Button
      variant="outline"
      borderColor="black"
      mr={2}
      isDisabled={!approvalNeeded || !amountIn}
      size="md"
      onClick={() => handleApprove(false)}
      isLoading={approvalLoading}
      loadingText="/CHECK_WALLET"
      width="100%"
      backgroundColor={
        colorMode === "light" ? "black" : configByAsset[asset].color
      }
      color={colorMode === "light" ? configByAsset[asset].color : "black"}
    >
      /APPROVE
    </Button>
  );
};

type BridgeButtonProps = {
  amountIn: string;
  destinationChain: number;
  walletChain: number;
  connext: { sdkBase: SdkBase; sdkUtils: SdkUtils };
  relayerFee: string;
  walletAddress: Address;
  asset: Asset;
  bridge: Bridge | undefined;
};
const BridgeButton = ({
  walletChain,
  relayerFee,
  amountIn,
  destinationChain,
  walletAddress,
  connext,
  asset,
  bridge,
}: BridgeButtonProps) => {
  const { colorMode } = useColorMode();
  const [xcallLoading, setXCallLoading] = useState(false);
  const [xcallTxHash, setXCallTxHash] = useState<Hash | undefined>();
  const { sendTransactionAsync } = useSendTransaction();
  const { isLoading } = useWaitForTransactionReceipt({
    hash: xcallTxHash,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleXCall = async () => {
    console.log(`amountIn: ${parseEther(amountIn)}`);
    console.log("relayerFee: ", relayerFee);
    setXCallLoading(true);
    try {
      let tx: Hash;
      if (bridge === "base") {
        const data = encodeFunctionData({
          abi: zoomerXerc20LockboxBaseAbi,
          functionName: "depositAndBridgeToL2",
          args: [parseEther(amountIn)],
        });
        tx = await sendTransactionAsync({
          to: zoomerXerc20LockboxBaseAddress[mainnet.id] as Address,
          data,
        });
      } else if (bridge === "ccip") {
        if (relayerFee === "0") {
          throw new Error("relayerFee is 0");
        }
        const data = encodeFunctionData({
          abi: cciPxErc20BridgeAbi,
          functionName: "bridgeTokens",
          args: [destinationChain, walletAddress, parseEther(amountIn)],
        });
        tx = await sendTransactionAsync({
          to: cciPxErc20BridgeAddress[
            walletChain as keyof typeof cciPxErc20BridgeAddress
          ] as Address,
          data,
          value: BigInt(relayerFee),
        });
      } else if (bridge === "connext") {
        if (relayerFee === "0") {
          throw new Error("relayerFee is 0");
        }
        const sdkParams = {
          origin: chainIdToDomain(walletChain).toString(),
          destination: chainIdToDomain(destinationChain!).toString(),
          to:
            destinationChain === mainnet.id
              ? CONNEXT_LOCKBOX_ADAPTER_MAINNET
              : walletAddress,
          asset: getAddressByAsset(asset, walletChain),
          delegate: walletAddress,
          amount: parseEther(amountIn).toString(),
          slippage: "300",
          callData:
            destinationChain === mainnet.id
              ? encodeAbiParameters(
                  [{ name: "receipient", type: "address" }],
                  [walletAddress]
                )
              : "0x",
          relayerFee,
        };
        console.log("sdkParams: ", sdkParams);
        const res = await connext!.sdkBase.xcall(sdkParams);
        console.log("res: ", res);
        const data = await sendTransactionAsync({
          to: res.to! as Address,
          value: BigInt(relayerFee),
          data: res.data! as Hex,
        });
        tx = data;
      } else {
        throw new Error("bridge is undefined");
      }
      console.log("tx: ", tx);
      setXCallLoading(false);
      setXCallTxHash(tx);
      onOpen();
    } catch (e) {
      console.log("bridging error: ", e);
      toast({
        title: "Bridging Error",
        description: (e as Error).message,
        status: "error",
      });
      setXCallLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        borderColor="black"
        isDisabled={
          (bridge !== "connext" &&
            bridge !== "ccip" &&
            BigInt(relayerFee) === BigInt(0)) ||
          !amountIn
        }
        isLoading={xcallLoading || isLoading}
        onClick={handleXCall}
        loadingText="/CHECK_WALLET"
        backgroundColor={
          colorMode === "light" ? "black" : configByAsset[asset].color
        }
        color={colorMode === "light" ? configByAsset[asset].color : "black"}
        width="100%"
      >
        {"/BRIDGE"}
      </Button>
      <BridgedModal
        isOpen={isOpen}
        onClose={onClose}
        txHash={xcallTxHash!}
        asset={asset}
        bridge={bridge}
      />
    </>
  );
};

type BridgedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  txHash: string;
  asset: Asset;
  bridge: Bridge | undefined;
};
const BridgedModal = ({
  isOpen,
  onClose,
  txHash,
  asset,
  bridge,
}: BridgedModalProps) => {
  const linkColor = useColorModeValue("blueAlpha.400", "whiteAlpha.900");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent backgroundColor={configByAsset[asset].color}>
        <ModalHeader>Bridging Initiated!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <video autoPlay loop src={require("../../public/dab.mp4")} muted />
        </ModalBody>
        <ModalFooter>
          Bridging will take some time. You can close this page and check your
          wallet later.{" "}
          {bridge === "connext" ? (
            <Link
              href={`https://connextscan.io/tx/${txHash}`}
              isExternal
              color={linkColor}
            >
              Check Tx
            </Link>
          ) : bridge === "ccip" ? (
            <Link href={`https://ccip.chain.link`} isExternal color={linkColor}>
              Check Tx
            </Link>
          ) : (
            <></>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const BridgeDescription = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton width="100%">
            <Box as="span" flex="1" textAlign="left">
              <Text as="b">what is this??</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text as="b">
            Based crosschain memecoin bridge.
            <br />
            <br />
            1. Choose your asset.
            <br />
            2. Select your chains.
            <br />
            3. Approve.
            <br />
            4. Bridge.
            <br />
            5. Bridging takes time! After your transaction is sent, you can
            close the window and check your wallet later.
            <br />
            6. Wait at least 4 hours before contacting support.
            <br />
            <br />
            Still need support? Interested in taking your coin cross-chain? Join
            the Zoomer{" "}
            <Link
              href="https://t.me/zoomercoinofficial"
              isExternal
              color="blue.400"
            >
              Telegram
            </Link>
            .
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const SolanaDescription = () => {
  return (
    <Text as="b">
      Bridging to and from Solana requires using Wormhole Portal Bridge (for
      now).
      <br />
      You will need to use an external website to bridge your coins!
      <br />
      Use the following instructions to use the Portal Bridge:
      <br />
      <br />
      1. Navigate to the{" "}
      <Link
        href="https://portalbridge.com/advanced-tools/#/transfer"
        isExternal
        color="blue.400"
        target="_blank"
      >
        Wormhole Portal Bridge
      </Link>
      .
      <br />
      2. Select your chains, ONLY selecting Ethereum and Solana as
      source/target.
      <br />
      3. Connect your source wallet.
      <br />
      3. If Ethereum is source, paste the address{" "}
      <Link
        href="https://etherscan.io/token/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676"
        isExternal
        color="blue.400"
      >
        0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676
      </Link>
      .
      <br />
      4. If Solana is source, paste the address{" "}
      <Link
        href="https://solscan.io/token/nBZEcHSG771mRbi4y2sSgKjfDUH8jsM2Eo5fNcASLeU"
        isExternal
        color="blue.400"
      >
        nBZEcHSG771mRbi4y2sSgKjfDUH8jsM2Eo5fNcASLeU
      </Link>
      <br />
      5. Connect your target wallet. Verify that the addresses match the above!
      <br />
      6. Use the {"Next"} dialog button to proceed and send the tokens through
      the bridge. There will be a few transactions and long confirmation times,
      so make sure you keep the page open and complete the process!
      <br />
      <br />
      Still need support? Join the Zoomer{" "}
      <Link href="https://t.me/zoomercoinofficial" isExternal color="blue.400">
        Telegram
      </Link>{" "}
      and contact the mods.
    </Text>
  );
};

type CheckOldZoomerProps = {
  address: Address;
};
const CheckOldZoomer = ({ address }: CheckOldZoomerProps) => {
  const { data: balance, isSuccess: isSuccessBalance } =
    useReadZoomerXerc20OldBalanceOf({
      args: [address],
      chainId: 137,
    });

  return isSuccessBalance && balance! > BigInt(0) ? (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>
        You have the old Zoomer on Polygon! Please visit the{" "}
        <Link as={NextLink} href="/migrate" color="blue.400">
          MIGRATION UI
        </Link>{" "}
        to migrate!
      </AlertDescription>
    </Alert>
  ) : (
    <></>
  );
};
