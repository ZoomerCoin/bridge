import { useMemo, useState } from "react";

export function useZoomerValue() {
  const [usd, setUsd] = useState<number>(0);
  useMemo(() => {
    const getData = async () => {
      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": "CG-Kjh2aK8Y1JXDEe5DLvwnPfRm" },
      };
      const tokenAddress = "0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676";
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`,
        options
      );

      const data = await response.json();
      if (response?.status !== 200) return;

      const val = Object.values(data)[0] as { usd: number };
      setUsd(val?.usd);

      return val?.usd;
    };
    getData();
  }, []);

  return usd;
}




/*

*/