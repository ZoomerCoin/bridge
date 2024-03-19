"use client";
import { chainsTheme } from "@/utils/colors";
import { getChainName } from "@/utils/chaintoname";
import Link from "next/link";

export default function Page() {
  return (
    <div
      className={` flex flex-col w-full min-h-screen items-start justify-start lg:px-[15%] px-[5%] md:px-[10%] py-24 bg-white`}
    >
      <p className={` text-3xl font-semibold`}>Bridge 🌉</p>
      <p>Select the destination chain you want to bridge your ZOOMER to.</p>
      <div
        className={`mt-8 w-max grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto`}
      >
        {chainsTheme.map((chain: any, idx: number) => (
          <Link
            key={idx}
            className={` w-[248px] h-[300px] ${chain.theme} px-4 py-2 text-white rounded-[32px] relative cursor-pointer items-center justify-center flex flex-col`}
            href={`${chain.chain}`}
          >
            <img
              src={`/v2/logo/${chain.chain}.png`}
              alt=""
              className={`w-[24px] absolute  top-3 right-3`}
            />
            <img
              src={`/v2/zoomers/${chain.chain}.png`}
              alt="zoomers"
              className={`w-[152px] h-[152px] mx-auto translate-x-2 mix-blend-luminosity mt-4 `}
            />
            <p className={` text-2xl mt-4 text-center font-semibold `}>
              {getChainName(chain.chain)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/*
 <div  className={``}>
      Dashboard
    </div>
*/
