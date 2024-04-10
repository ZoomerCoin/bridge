import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { BiChevronDown } from "react-icons/bi";
// import { AiOutlineSearch } from "react-icons/ai";
//@ts-ignore
import { switchChain } from "@wagmi/core";
import { solana } from "@/utils/asset";
import { wagmiConfig } from "@/wagmi";
import { getChainName } from "@/utils/chaintoname";
import { getThemeColor } from "@/utils/colors";
import { useWalletClient, useAccount } from "wagmi";

interface ISelector {
  options: number[];
  setOriginChain: Dispatch<SetStateAction<number | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  newRef: any;
  destinationChain: number;
  originChain: number;
}

const Selector = ({
  options,
  setOriginChain,
  newRef,
  open,
  setOpen,
  destinationChain,
  originChain
}: ISelector) => {
  // const [selected, setSelected] = useState<string>();
  // const [open , setOpen] = useState<boolean>(false)
  // console.log(open , setOpen )

  const { data: walletClient } = useWalletClient();
  const { isConnected } = useAccount();

  function getColor(chain: number) {
    const { theme } = getThemeColor(chain);
    if (chain === 0) {
      const textcolor = "#000000";
      return { theme, textcolor };
    }
    const textcolor = theme.slice(4, -3);

    return { theme, textcolor };
  }

  useEffect(() => {
    if ((isConnected ) && (destinationChain !== originChain)) {
      // setSelected(originChain.toString());
      console.log({originChain , destinationChain})
    }
  }, [isConnected, originChain , destinationChain]);


  return (
    <div ref={newRef} className="w-full capitalize text-sm  relative ">
      <div
        onClick={() => setOpen((prevState) => !prevState)}
        className={`  cursor-pointer my-2 text-black  w-full  flex  items-center justify-start gap-2 rounded-[12px] border border-black/20 `}
      >
        {originChain && destinationChain?.toString() !== originChain.toString() ? (
          <div
            style={{
              color: getColor(+originChain).textcolor,
              backgroundColor: getColor(+originChain).textcolor + "1a",
            }}
            className={`w-max font-semibold rounded-[8px] flex items-center mx-2 my-1 px-2 py-0.5 gap-2 justify-start capitalize `}
          >
            {" "}
            <img
              src={`/v2/logo/${originChain}.png`}
              alt="logo"
              className={`w-4`}
            />{" "}
            {originChain === 0
              ? "Solana"
              : getChainName(+originChain).toLowerCase()}
            <img
              className={`w-3 transition-all duration-100 ease-linear absolute right-2 ${open ? "rotate-180" : "rotate-0"} `}
              src="https://img.icons8.com/ios/50/000000/expand-arrow--v2.png"
              alt="expand-arrow--v2"
            />
          </div>
        ) : (

            <>
            <span className="px-3 rounded-[8px]  mx-2 my-1  py-0.5">
              {" "}
              Select Chain
            </span>
            <img
              className={`w-3 transition-all duration-100 ease-linear absolute right-2 ${open ? "rotate-180" : "rotate-0"} `}
              src="https://img.icons8.com/ios/50/000000/expand-arrow--v2.png"
              alt="expand-arrow--v2"
            />
           </>
        )}

        <ul
          className={`  left-0  w-[150%] ${
            open ? "block" : "hidden transition-all  delay-1000"
          } absolute top-full origin-top z-40 shadow-xl shadow-black/10 bg-white rounded-xl py-2 border border-black/10 `}
        >
          {options &&
            options.map((chainId: number, idx: number) => (
              <li
                value={chainId}
                key={idx}
                      className={`  text-sm flex items-center justify-between w-full  mt-0.5 py-1 px-2 
                ${ (+chainId === destinationChain ) || (+chainId === 0 && destinationChain !== 1) ? "hidden" : "block"}  hover:bg-gray-100/85  active:bg-gray-200  `}
                onClick={async () => {
                  if (originChain && +chainId !== +originChain) {
                    setOriginChain(+chainId);
                    
                    if (+chainId !== solana.id) {
                      await switchChain(wagmiConfig, {
                        chainId: +chainId,
                      });
                      setOpen(false);
                    }
                  }
                }}
              >
                <button
                  style={{
                    color: getColor(+chainId).textcolor,
                    backgroundColor: getColor(+chainId).textcolor + "1a",
                  }}
                  className={`w-max font-semibold  flex items-center px-3 py-1.5 gap-2 justify-start capitalize rounded-xl `}
                >
                  <img
                    src={`/v2/logo/${chainId}.png`}
                    alt="logo"
                    className={`w-4`}
                  />
                  {chainId && chainId === 0
                    ? "Solana"
                    : getChainName(+chainId).toLowerCase()}
                </button>
                {originChain && +chainId === +originChain && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Selector;