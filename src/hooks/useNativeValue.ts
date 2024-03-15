import { useMemo, useState } from "react";

export function useNativeValue(chainId: number ) {
  const chainIds = [
    { id: 8453, chain: "ethereum" },
    { id: 42161, chain: "ethereum" },
    { id: 1, chain: "ethereum" },
    { id: 56, chain: "binancecoin" },
    { id: 10, chain: "ethereum" },
    { id: 137, chain: "matic-network" },
  ];
  
  const [usd, setUsd] = useState<number>(0);
  const selectedChain = chainIds.find(val => chainId === val.id)
  useMemo(() => {
    console.log(selectedChain)
    const getData = async () => {
      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": "CG-Kjh2aK8Y1JXDEe5DLvwnPfRm" },
      };
      const tokenAddress = "0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676";
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${selectedChain?.chain}&vs_currencies=usd`,
        options
      );
    
      const data = await response.json();
      console.log(data)
      if (response?.status !== 200) return;

      const val = Object.values(data)[0] as { usd: number };
      setUsd(val?.usd);

      return val?.usd;
    };
    getData();
  }, [chainId]);

  return usd;
}
