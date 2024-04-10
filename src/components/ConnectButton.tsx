"use client";
import { createWeb3Modal, useWeb3Modal } from "@web3modal/wagmi/react";
import { formatAddress } from "@/utils/formatAddress";
import { useAccount } from "wagmi";
import { projectId, wagmiConfig } from "@/wagmi";
import { usePathname, useRouter } from "next/navigation"; 
interface IProp {
  colorTheme?: string;
  width? : string
}

createWeb3Modal({
  wagmiConfig: wagmiConfig as any,
  projectId,
});

export default function ConnectButton({ colorTheme = "bg-black" , width  }: IProp) {
  const { open } = useWeb3Modal();
  const { address, chain, isConnected } = useAccount();
  const pathname = usePathname();
  return (
    <div
      className={` ${!isConnected ? "bg-black" : colorTheme} cursor-pointer py-[10px] px-[12px] rounded-[12px] h-[44px] ${width ? width : 'w-[172px]'} text-white font-semibold text-center  `}
      onClick={() => open()}
    >
      {address ? (
        <div className="flex items-center justify-center gap-2">
          <img src={`/v2/logo/${chain?.id}.png`} alt="logo" className={`w-4`} />
          {formatAddress(address)}
        </div>
      ) : (
        <button onClick={() => open()}>Connect Wallet</button>
      )}
    </div>
  );
}
