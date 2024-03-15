"use client";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { wagmiConfig, projectId } from "../wagmi";
import { getThemeColor } from "@/utils/colors";
import ConnectButton from "@/components/ConnectButton";
import { usePathname, useRouter } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  console.log(pathname.slice(1)); // need to change below when moving to main page also in connect button

  return (
    <div
      className={` z-50 flex items-center justify-between lg:px-[15%] px-[5%] md:px-[10%] py-4 fixed top-0 left-0 w-full backdrop-blur-sm`}
    >
      <div className={`w-[30%] ${pathname === "/" ? "hidden" : `block`} `}>
        <img
          onClick={() => router.back()}
          className={` w-10  ${pathname === "/v2" ? "bg-black" : "bg-white/20"} rounded-xl cursor-pointer`}
          src="https://img.icons8.com/ios/50/ffffff/left--v1.png"
          alt="left-squared--v1"
        />
      </div>

      {pathname === "/" ? (
        <div className={`w-10 h-10 rounded-full bg-[#ffff00] overflow-hidden`}>
          <img
            src="/v2/zoom.png"
            alt=""
            className={`w-9 translate-x-0.5 translate-y-1`}
          />
        </div>
      ) : (
        <img
          src={`/v2/zoomers/${pathname.slice(1)}.png`}
          alt=""
          className={`w-[56px] h-[56px] translate-x-0.5 translate-y-1`}
        />
      )}
      <div className={`w-[30%] flex justify-end`}>
        <ConnectButton colorTheme={pathname === "/" ? 'bg-black' : 'bg-white/20'}/>
      </div>
    </div>
  );
};
