"use client";

//-------------------------IMPORTS------------------
import { getThemeColor } from "@/utils/colors";
import { getChainName } from "@/utils/chaintoname";
import ConnectButton from "@/components/ConnectButton";
import SolanaDescription from "@/components/v2/SolanaDescription";
import CheckOldZoomer from "@/components/v2/CheckOldZoomer";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  useRef,
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
import TxModal from "@/components/v2/TxModal";
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
import { Asset, configByAsset, getAddressByAsset, solana } from "@/utils/asset";
import { wagmiConfig } from "@/wagmi";
import { ZOOMER_YELLOW } from "@/utils/colors";
import { Bridge, bridgeConfig, getApproveToByBridge } from "@/utils/bridge";
import Link from "next/link";
import Selector from "@/components/v2/Selector";
import BridgeModal from "@/components/v2/BridgeModal";
import { useZoomerValue } from '@/hooks/useZoomerValue'
import { useNativeValue } from '@/hooks/useNativeValue'
//-------------------------INTERFACES------------------
interface Iprops {
  params: { bridgeTo: string };
}
//-------------------------GLOBAL CONSTS------------------

const CONNEXT_LOCKBOX_ADAPTER_MAINNET =
  "0x45BF3c737e57B059a5855280CA1ADb8e9606AC68";

export default function Page({ params }: Iprops) {
  //hooks
  const { theme, themeBorder } = getThemeColor(+params?.bridgeTo);
  const textcolor = theme.slice(4, -3);
  const { address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { isConnected } = useAccount();
  const urlParams = useSearchParams();
  const pathname = usePathname();
  const currentChain = getChainName(+params?.bridgeTo);
  //States
  const [asset, setAsset] = useState<Asset>("zoomer");
  const [_amountIn, setAmountIn] = useState<string>("");
  const [relayerFee, setRelayerFee] = useState("0");
  const [relayerFeeLoading, setRelayerFeeLoading] = useState(false);
  const [approvalNeeded, setApprovalNeeded] = useState(true);
  const [modal, setModal] = useState<boolean>(false);
  const [txModal, setTxModal] = useState<boolean>(false);
  const [destinationChain, setDestinationChain] = useState<
    number | undefined
  >();
  const [originChain, setOriginChain] = useState<number | undefined>();
  const [bridge, setBridge] = useState<Bridge>();
  // const [nativeValue ,  setNativeValue] = useState<number>(0)
  // const [selectorOpen, setSelectorOpen] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false);
  const [connext, setConnext] = useState<
    { sdkBase: SdkBase; sdkUtils: SdkUtils } | undefined
  >();
  const pubClient = usePublicClient();

  const amountIn = useDebounce(_amountIn, 500);
  const router = useRouter()
  const zoomerUsdValue = useZoomerValue()
  const nativeCurrencyValue = useNativeValue(originChain as number || 1 )
  
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
      setDestinationChain(+params?.bridgeTo);
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletClient?.account?.address]);

  useEffect(() => {
    if (!isConnected) {
      setOriginChain(undefined);
    }
  }, [isConnected]);

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

  //Data for selector compoent
  const chainsArr = configByAsset[asset].chains.map((chain) => chain.id);

  //getting amount in wallet to display
  const { data: balance, isSuccess: isSuccessBalance } = useReadErc20BalanceOf({
    //@ts-ignore
    address: getAddressByAsset(asset, walletClient?.chain?.id),
    //@ts-ignore
    args: [walletClient?.account?.address],
  });

  //Bridges Data
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
    console.log(bridges);
    setBridge(bridges[0]?.bridge as Bridge);
  }, [bridges]);

  const newRef = useRef(null!);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: any) => {
    //@ts-ignore
    if (newRef.current && !newRef.current?.contains(e?.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (originChain == 0) {
      router.push("/0");
    }
  }, [destinationChain, originChain, router]);
  const showDiv = originChain !== 0 && destinationChain !== 0;

  return (
    <div
      className={` ${theme} w-full min-h-screen flex flex-col py-20 items-center justify-center text-black`}
    >
      <div
        className={` lg:w-[396px] w-[80%] sm:w-[50%] md:w-[40%] bg-white/50 rounded-3xl p-3 overflow-hidden  `}
      >
        <div
          className={`w-full px-[24px] pb-[20px] bg-white h-full min-h-max rounded-2xl `}
        >
          {/* Main Box starts */}

          {/* -------------- */}
          <CheckOldZoomer address={walletClient?.account?.address} />
          {/* -------------- */}

          {/* -------------- */}
          <p className={`capitalize font-semibold py-[22px]`}>
            Bridge to {currentChain && currentChain?.toLowerCase()}
          </p>
          {/* -------------- */}

          {/* {originChain === 0 || destinationChain === 0 ? (
            <SolanaDescription />
          ) : (
            ""
          )} */}
          {pathname === "/0" && <SolanaDescription />}

          {/* -------------- */}

          {pathname !== "/0" && (
            <div
              className={` w-full flex justify-between items-center lg:gap-x-3 gap-x-2 ${showDiv ? "" : "hidden opacity-0"}   `}
            >
              <div className={` lg:w-full w-[46%]`}>
                <p className={`text-sm`}>From</p>
                <Selector
                  options={chainsArr}
                  setOriginChain={setOriginChain}
                  newRef={newRef}
                  open={open}
                  setOpen={setOpen}
                  destinationChain={destinationChain as number}
                  originChain={originChain as number}
                />
              </div>
              <img
                className={`w-4 h-4`}
                src="https://img.icons8.com/fluency-systems-regular/48/right--v1.png"
                alt="right--v1"
              />
              <div className={` lg:w-full w-[46%] `}>
                <p className={`text-sm `}>To</p>
                <div
                  className={`  text-sm flex w-max  m-2  truncate rounded-xl  ${theme} `}
                >
                  <div
                    style={{ color: textcolor }}
                    className={`w-full font-semibold bg-white/90 flex items-center px-3  py-1.5 gap-2 justify-start capitalize  `}
                  >
                    <img
                      src={`/v2/logo/${+params?.bridgeTo}.png`}
                      alt="logo"
                      className={`w-4`}
                    />
                    {currentChain?.toLowerCase()}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* -------------- */}

          {/* -------------- */}
          {pathname !== "/0" && (
            <div
              className={`w-full mt-3 flex flex-col items-center  gap-2 justify-center  ${showDiv ? "" : "hidden opacity-0"} `}
            >
              {isConnected && (
                <div className={`flex w-full truncate   gap-x-1  `}>
                  <p className={`text-sm`}>Amount</p>
                  <div
                    className={`text-sm  ml-auto flex gap-x-2 text-black/40`}
                  >
                    <span>
                      Balance:{" "}
                      {isSuccessBalance
                        ? Number(formatEther(balance!))?.toFixed(2)
                        : "..."}{" "}
                    </span>
                    <span>{asset.toUpperCase()}</span>
                  </div>
                </div>
              )}

              {/* first box starts here */}
              <div
                className={` w-full flex items-center justify-start rounded-2xl border  border-black/20 p-3 ${themeBorder} `}
              >
                <div
                  className={` flex w-max items-center justify-start gap-2 `}
                >
                  <div className={`w-[24px]  relative   `}>
                    <div
                      className={`w-full rounded-full bg-[#ffff00] overflow-hidden`}
                    >
                      <img src="/v2/zoom.png" alt="logo" className={`w-9 `} />
                      <img
                        src={`/v2/logo/${originChain && originChain}.png`}
                        alt="logo"
                        className={`w-2 absolute bottom-0 right-0 ${originChain ? "block" : "hidden"}`}
                      />
                    </div>
                  </div>
                  <span className="capitalize ">{asset.toLowerCase()}</span>
                  <button
                    onClick={() => {
                      setAmountIn(formatEther(balance!));
                    }}
                    className={`bg-[#FED95233] text-[#795F00] py-[4px] px-[6px] rounded-[8px] text-[14px] `}
                  >
                    {" "}
                    Max
                  </button>
                </div>
                <div
                  className={` ml-auto  w-max flex flex-col items-end justify-end`}
                >
                  <input
                    type="number"
                    placeholder="0"
                    value={_amountIn}
                    onChange={(e) => setAmountIn(e?.target?.value)}
                    className={`text-sm focus:outline-none  placeholder:text-end text-end w-full`}
                  />

                  <p className={`text-xs text-black/40`}>${(+amountIn * zoomerUsdValue).toFixed(4)}</p>
                </div>
              </div>
              {/* first box ends here */}

              {/* second box starts here */}

              <div
                onClick={() =>
                  amountIn && isConnected ? setModal(true) : null
                }
                className={` w-full flex  items-center justify-start ${amountIn && isConnected ? "rounded-t-2xl" : "rounded-2xl"} ${amountIn ? "cursor-pointer" : ""} border border-black/20 p-3 `}
              >
                <div
                  className={` flex w-max items-center justify-start gap-x-2 `}
                >
                  <span className="capitalize font-bold">You Receive</span>
                </div>
                <div
                  className={` ml-auto  flex flex-col items-end justify-end`}
                >
                  <div className={` flex items-center justify-center gap-1`}>
                    <div className={`w-[24px]  relative   `}>
                      <div
                        className={`w-full rounded-full bg-[#ffff00] overflow-hidden`}
                      >
                        <img src="/v2/zoom.png" alt="" className={`w-full `} />
                        <img
                          src={`/v2/logo/${destinationChain && destinationChain}.png`}
                          alt="logo"
                          className={`w-2 absolute bottom-0 right-0 ${destinationChain ? "block" : "hidden"}`}
                        />
                      </div>
                    </div>
                    <span className={`text-sm`}>
                      {amountIn && isConnected
                        ? (
                            Number(amountIn) *
                            (bridge === "base"
                              ? 1
                              : bridge === "ccip"
                                ? 0.999
                                : 0.9995)
                          ).toFixed(4)
                        : "0"}
                    </span>
                  </div>

                  <p className={`text-xs text-black/40`}>${(Number(amountIn) * 0.9995 * zoomerUsdValue).toFixed(4)}</p>
                </div>
              </div>
              {/* second box ends here here */}

              {/* fees box starts */}
              {amountIn && isConnected && originChain && (
                <div
                  style={{
                    color: textcolor,
                    backgroundColor: textcolor + "1a",
                  }}
                  className={`w-full -translate-y-2 px-3  flex items-center justify-start rounded-b-2xl gap-2 mt-0  text-[11px]  truncate`}
                >
                  <div className={` flex gap-x-1 `}>
                    {relayerFeeLoading && originChain
                      ? "..."
                      : Number(formatEther(BigInt(relayerFee))).toFixed(4)}{" "}
                    {walletClient?.chain?.id && !relayerFeeLoading
                      ? configByAsset[asset].chains.find(
                          (chain) => chain?.id === walletClient?.chain?.id
                        )?.nativeCurrency?.symbol 
                      : "???"}
                  <span>({relayerFeeLoading && originChain ? "..." : '$'+(nativeCurrencyValue * Number(formatEther(BigInt(relayerFee)))).toFixed(2)})</span>

                  </div>
                  <span>&bull;</span>
                  <span className={` uppercase `}>
                    {" "}
                    {bridge && originChain ? bridge : "..."}
                  </span>
                  <span>&bull;</span>
                  <div className={` flex  items-center justify-center w-max`}>
                    <img
                      className={` w-4 py-1 ${bridge ? "block" : " hidden"} `}
                      src={`https://img.icons8.com/windows/32/${textcolor.slice(1)}/clock--v1.png`}
                      alt="clock--v1"
                    />
                    <span className={`  `}>
                      {" "}
                      {bridge && originChain ? "~ 5 m" : " ~ ... m"}
                    </span>
                  </div>
                </div>
              )}
              {/* fees box ends */}

              {/* action button starts */}

              {!isConnected ||
              !walletClient?.account?.address ||
              !walletClient?.chain?.id ? (
                <div
                  className={`mt-7 w-full  ${originChain === 0 || +params?.bridgeTo === 0 ? "hidden" : null}`}
                >
                  <ConnectButton colorTheme={theme} width="w-full" />
                </div>
              ) : (
                <ActionButtons
                  amountIn={amountIn}
                  connext={connext as { sdkBase: SdkBase; sdkUtils: SdkUtils }}
                  destinationChain={destinationChain as number}
                  originChain={originChain as number}
                  relayerFee={relayerFee}
                  walletAddress={walletClient?.account?.address}
                  walletChain={walletClient?.chain?.id}
                  approvalNeeded={approvalNeeded}
                  setApprovalNeeded={setApprovalNeeded}
                  asset={asset}
                  bridge={bridge}
                  setTxModal={setTxModal}
                  txModal={txModal}
                  textcolor={textcolor}
                />
              )}

              {/* action button ends */}
            </div>
          )}

          {/* -------------- */}
        </div>
      </div>

      {/* both white boxes end upper */}

      {/* the modals */}

      <div
        className={` absolute top-0 left-0 w-full min-h-screen bg-black/20 flex items-center justify-center ${modal && amountIn ? "block" : "hidden"}`}
      >
        <BridgeModal
          bridges={bridges}
          amountIn={+amountIn}
          setModal={setModal}
          setBridge={setBridge}
          textcolor={textcolor}
          destinationChain={destinationChain as number}
          currentbridge={bridge as Bridge}
        />
      </div>

      {/* modals end here */}
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
  setTxModal: Dispatch<SetStateAction<boolean>>;
  txModal: boolean;
  asset: Asset;
  bridge: Bridge | undefined;
  textcolor: string;
  originChain: number;
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
  setTxModal,
  txModal,
  textcolor,
  originChain,
}: ActionButtonsProps) => {
  return (
    <div
      className={`flex w-full flex-col mt-2 ${originChain === 0 || destinationChain === 0 ? "hidden" : ""}`}
    >
      {approvalNeeded ? (
        <ApproveButton
          amountIn={amountIn}
          approvalNeeded={approvalNeeded}
          connext={connext}
          setApprovalNeeded={setApprovalNeeded}
          walletChain={walletChain}
          asset={asset}
          bridge={bridge}
          textcolor={textcolor}
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
          setTxModal={setTxModal}
          txModal={txModal}
          textcolor={textcolor}
          setApprovalNeeded={setApprovalNeeded}
          originChain={originChain}
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
  textcolor: string;
};
const ApproveButton = ({
  amountIn,
  walletChain,
  connext,
  approvalNeeded,
  setApprovalNeeded,
  asset,
  bridge,
  textcolor,
}: ApproveButtonProps) => {
  const [approvalLoading, setApprovalLoading] = useState(false);
  const { sendTransactionAsync } = useSendTransaction();
  const [txHash, setTxHash] = useState<Hash | undefined>();
  const { isLoading } = useWaitForTransactionReceipt({ hash: txHash });
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
      style={{ backgroundColor: textcolor }}
      className={`w-full  py-[10px] px-[12px] rounded-[8px] h-[44px] text-center  text-white font-semibold cursor-pointer mt-6  ${!approvalNeeded || !amountIn ? "opacity-50" : null} `}
    >
      {approvalLoading
        ? "Check wallet later"
        : amountIn
          ? "Approve"
          : "Enter Amount"}
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
  setTxModal: Dispatch<SetStateAction<boolean>>;
  txModal: boolean;
  textcolor: string;
  setApprovalNeeded: Dispatch<SetStateAction<boolean>>;
  originChain : number
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
  setTxModal,
  txModal,
  textcolor,
  setApprovalNeeded,
  originChain
}: BridgeButtonProps) => {
  const [xcallLoading, setXCallLoading] = useState(false);
  const [xcallTxHash, setXCallTxHash] = useState<Hash | undefined>();
  const { sendTransactionAsync } = useSendTransaction();
  const { isLoading } = useWaitForTransactionReceipt({
    hash: xcallTxHash,
  });

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
      setTxModal(true);
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

  const shouldBeDisabled =
    (bridge !== "connext" &&
      bridge !== "ccip" &&
      bridge !== "base" &&
      BigInt(relayerFee) === BigInt(0)) ||
    !amountIn;

  return (
    <>
      <button
        disabled={shouldBeDisabled}
        // isLoading={xcallLoading || isLoading}
        style={{ backgroundColor: textcolor }}
        onClick={handleXCall}
        className={`w-full  py-[10px] px-[12px] rounded-[8px] h-[44px] text-center text-white font-semibold cursor-pointer mt-6 ${shouldBeDisabled ? "opacity-50" : null}`}
      >
        {"BRIDGE"}
      </button>
      <div
        className={` absolute top-0 left-0 w-full min-h-screen bg-black/20 flex items-center justify-center ${txModal ? "block" : "hidden"}`}
      >
        <TxModal
          txHash={xcallTxHash!}
          bridge={bridge!}
          setTxModal={setTxModal}
          fee={+relayerFee}
          amountIn={+amountIn}
          textcolor={textcolor}
          setApprovalNeeded={setApprovalNeeded}
          originChain={originChain}
        />
      </div>
    </>
  );
};
