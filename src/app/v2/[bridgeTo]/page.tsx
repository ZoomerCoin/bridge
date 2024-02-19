"use client";

//-------------------------IMPORTS------------------
import { getThemeColor } from "@/utils/colors";
import { getChainName } from "@/utils/chaintoname";
import ConnectButton from "@/components/ConnectButton"
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

import { useDebounce } from "@/hooks/useDebounce";
import {
  cciPxErc20BridgeAbi,
  cciPxErc20BridgeAddress,
  useReadErc20BalanceOf,
  useReadZoomerXerc20OldBalanceOf,
  zoomerCoinAddress,
  zoomerXerc20LockboxBaseAbi,
  zoomerXerc20LockboxBaseAddress,
} from "@/generated";
import {
  Asset,
  configByAsset,
  getAddressByAsset,
  solana,
} from "@/utils/asset";
import { wagmiConfig } from "@/wagmi";
import { ZOOMER_YELLOW } from "@/utils/colors";
import { Bridge, bridgeConfig, getApproveToByBridge } from "@/utils/bridge";
import Link from "next/link";
import Selector from "@/components/v2/Selector"

//-------------------------INTERFACES------------------
interface Iprops {
  params: { bridgeTo: string };
}
//-------------------------GLOBAL CONSTS------------------

const CONNEXT_LOCKBOX_ADAPTER_MAINNET =
  "0x45BF3c737e57B059a5855280CA1ADb8e9606AC68";


export default function Page({ params }: Iprops) {
  const { theme } = getThemeColor(+params?.bridgeTo);

  const textcolor = theme.slice(4,-3)
  const { address,  chain } = useAccount();
  
  const [asset, setAsset] = useState<Asset>("zoomer");
  const { data: walletClient } = useWalletClient();
  // const { colorMode } = useColorMode();
  const [_amountIn, setAmountIn] = useState("");
  const amountIn = useDebounce(_amountIn, 500);
  const [relayerFee, setRelayerFee] = useState("0");
  const [relayerFeeLoading, setRelayerFeeLoading] = useState(false);
  const [approvalNeeded, setApprovalNeeded] = useState(true);
  const [destinationChain, setDestinationChain] = useState<
    number | undefined
  >();  // this we can get from the useaccount hoook of wagmi
  const [originChain, setOriginChain] = useState<number | undefined>();
  const [bridge, setBridge] = useState<Bridge>();
  const [connext, setConnext] = useState<
    { sdkBase: SdkBase; sdkUtils: SdkUtils } | undefined
  >();
  const { isConnected } = useAccount();
  const pubClient = usePublicClient();
// this can be change
  const urlParams = useSearchParams();
  const currentChain = getChainName(+params?.bridgeTo)
  //NO need cause we are already briding to zoomer
  // const _asset = urlParams.get("asset");
  // if (_asset) {
  //    setAsset(_asset as Asset); 
  // }

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
      // setOriginChain(walletClient?.chain.id);
      setDestinationChain(+params?.bridgeTo);
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

  const chainsArr = configByAsset[asset].chains.map((chain) => chain.id)


  return (
    <div
      className={`${theme} w-full min-h-screen flex flex-col items-center justify-center text-black`}
    >
      <div className={` w-[30%] bg-white/50 rounded-3xl p-4    `}>
        <div
          className={`w-full p-[1rem] bg-white h-full min-h-[60vh] rounded-2xl `}
        >
           <CheckOldZoomer address={walletClient?.account?.address} />
           <p className={`capitalize font-semibold my-4`}>Bridge to {currentChain && currentChain?.toLowerCase()}</p>
           <div  className={`flex w-full justify-between items-center gap-x-3`} >
           <div  className={` w-full`}>
              <p className={`text-sm`}>From</p>
              {/* <SelectOriginChain asset={asset}
                    originChain={originChain}
                    setOriginChain={setOriginChain}
                    walletChain={walletClient?.chain?.id}/> */}
                    <Selector options={chainsArr} setOriginChain={setOriginChain} />

            </div>
            <img className={`w-4 h-4`} src="https://img.icons8.com/fluency-systems-regular/48/right--v1.png" alt="right--v1"/>
        <div  className={`w-full`}>
        <p className={`text-sm`}>To</p>
        <div className={`  text-sm flex w-max   rounded-xl  ${theme} `}>
          <div style={{color : textcolor}} className={`w-full font-bold bg-white/90 flex items-center px-3 py-1.5 gap-2 justify-start capitalize `}>

        <img
                  src={`/v2/logo/${+params?.bridgeTo}.png`}
                  alt="logo"
                  className={`w-4`}
                  />
                { currentChain?.toLowerCase()}
                  </div>
        </div>
        </div>
        </div>
           {!isConnected ||
            !walletClient?.account?.address ||
            !walletClient?.chain?.id ? <ConnectButton colorTheme={theme} /> : 
            "ActionButtons"
            
            }
        </div>
      </div>
    </div>
  );
}

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
    <div className={`flex flex-col`}>
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
    </div>
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

  // const toast = useToast();
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
      // toast({
      //   title: "Approval Error",
      //   description: (e as Error).message,
      //   status: "error",
      // });
      console.log("error: ", e);
    }
  };

  return (
    <button
      
      disabled={!approvalNeeded || !amountIn}
      onClick={() => handleApprove(false)}
      // isLoading={approvalLoading}
      // loadingText="/CHECK_WALLET"
     
    >
      {approvalLoading ? "Check wallet later" : "/APPROVE"}
    </button>
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
  // const { colorMode } = useColorMode();
  const [xcallLoading, setXCallLoading] = useState(false);
  const [xcallTxHash, setXCallTxHash] = useState<Hash | undefined>();
  const { sendTransactionAsync } = useSendTransaction();
  const { isLoading } = useWaitForTransactionReceipt({
    hash: xcallTxHash,
  });
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const toast = useToast();

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
      // onOpen();
    } catch (e) {
      console.log("bridging error: ", e);
      // toast({
      //   title: "Bridging Error",
      //   description: (e as Error).message,
      //   status: "error",
      // });
      setXCallLoading(false);
    }
  };

  return (
    <>
      <button
       
        disabled={
          (bridge !== "connext" &&
            bridge !== "ccip" &&
            BigInt(relayerFee) === BigInt(0)) ||
          !amountIn
        }
        // isLoading={xcallLoading || isLoading}
        // onClick={handleXCall}
        // loadingText="/CHECK_WALLET"
    
      >
        {"/BRIDGE"}
      </button>
      {/* <BridgedModal
        isOpen={isOpen}
        onClose={onClose}
        txHash={xcallTxHash!}
        asset={asset}
        bridge={bridge}
      /> */}
    </>
  );
};

type CheckOldZoomerProps = {
  address?: Address;
};
const CheckOldZoomer = ({ address }: CheckOldZoomerProps) => {
  const { data: balance, isSuccess: isSuccessBalance } =
    useReadZoomerXerc20OldBalanceOf({
      args: [address] as [`0x${string}`],
      chainId: 137,
    });

  return isSuccessBalance && balance! > BigInt(0) ? (
    <div className={` w-full bg-yellow-100 text-yellow-800 py-3 px-6 rounded-xl flex items-center justify-center text-center my-3 `} >
      {/* <AlertIcon /> */}
      
      <span>
        You have the old Zoomer on Polygon! Please visit the{" "}
        <Link  href="/migrate" className={`font-semibold underline`}>
          MIGRATION UI
        </Link>
        to migrate!
      </span>
    </div>
  ) : (
    <></>
  );
};


//we dont want to use this now


// type BridgedModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   txHash: string;
//   asset: Asset;
//   bridge: Bridge | undefined;
// };
// const BridgedModal = ({
//   isOpen,
//   onClose,
//   txHash,
//   asset,
//   bridge,
// }: BridgedModalProps) => {
//   const linkColor = useColorModeValue("blueAlpha.400", "whiteAlpha.900");
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay
//         bg="blackAlpha.300"
//         backdropFilter="blur(10px) hue-rotate(90deg)"
//       />
//       <ModalContent backgroundColor={configByAsset[asset].color}>
//         <ModalHeader>Bridging Initiated!</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <video autoPlay loop src={require("../../public/dab.mp4")} muted />
//         </ModalBody>
//         <ModalFooter>
//           Bridging will take some time. You can close this page and check your
//           wallet later.{" "}
//           {bridge === "connext" ? (
//             <Link
//               href={`https://connextscan.io/tx/${txHash}`}
//               isExternal
//               color={linkColor}
//             >
//               Check Tx
//             </Link>
//           ) : bridge === "ccip" ? (
//             <Link href={`https://ccip.chain.link`} isExternal color={linkColor}>
//               Check Tx
//             </Link>
//           ) : (
//             <></>
//           )}
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
  // );
// };

/*
 <div  className={``}>
      Dashboard
    </div>
*/
