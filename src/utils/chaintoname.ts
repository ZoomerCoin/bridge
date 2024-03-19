export function getChainName(idx: number) {
  if (idx === 1) return "ETHEREUM";
  if (idx === 56) return "BINANCE";
  if (idx === 137) return "POLYGON";
  if (idx === 10) return "OPTIMISM";
  if (idx === 8453) return "BASE";
  if (idx === 42161) return "ARBITRUM";
  if (idx === 0) return "SOLANA";
  return "NOTFOUND";
}
