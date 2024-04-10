"use client";
import { chainsTheme } from "@/utils/colors";
import { getChainName } from "@/utils/chaintoname";
import Link from "next/link";
import { useState } from "react";
import { base, mainnet } from "viem/chains";
import { solana } from "@/utils/asset";

const subsetChains = [mainnet.id, base.id, solana.id];

export default function Page() {
  const [allChains, setAllChains] = useState(false);

  const chainsToShow = allChains
    ? chainsTheme
    : chainsTheme.filter((chain) => subsetChains.includes(chain.chain));

  return (
    <div
      className={` flex flex-col w-full min-h-screen items-start justify-start lg:px-[15%] px-[5%] md:px-[10%] py-24 bg-white`}
    >
      <p className={` text-3xl font-semibold`}>Bridge 🌉</p>
      <p>Select the destination chain you want to bridge your ZOOMER to.</p>
      <label className="inline-flex items-center cursor-pointer pt-4">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={(event) => {
            console.log(event.target.checked);
            setAllChains(event.target.checked);
          }}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Show All Chains
        </span>
      </label>
      <div
        className={`mt-8 w-max grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto`}
      >
        {chainsToShow.map((chain: any, idx: number) => (
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
