export const ZOOMER_YELLOW = "#FEFC52";
export const GRUMPY_BLUE = "#47777C";

export const chainsTheme = [
  {
    chain: 1,
    theme: "bg-[#5a80f2ff]",
    themeBorder: "focus-within:border-[#5a80f2ff]",
  },
  {
    chain: 8453,
    theme: "bg-[#0051ffff]",
    themeBorder: "focus-within:border-[#0051ffff]",
  },
  {
    chain: 0,
    theme: "bg-gradient-to-r from-[#13d6b6] via-[#617fe8] to-[#9a4bfa]",
    themeBorder:
      "focus-within:border-gradient-to-r from-[#13d6b6] via-[#617fe8] to-[#9a4bfa]",
  },
  {
    chain: 10,
    theme: "bg-[#ff0000ff]",
    themeBorder: "focus-within:border-[#ff0000ff]",
  },
  {
    chain: 137,
    theme: "bg-[#9d2adbff]",
    themeBorder: "focus-within:border-[#9d2adbff]",
  },
  {
    chain: 56,
    theme: "bg-[#fab700ff]",
    themeBorder: "focus-within:border-[#fab700ff]",
  },
  {
    chain: 42161,
    theme: "bg-[#1c324aff]",
    themeBorder: "focus-within:border-[#1c324aff]",
  },
];

export function getThemeColor(chain: number) {
  const val = chainsTheme.filter((col) => col.chain == chain);
  return val[0];
}
