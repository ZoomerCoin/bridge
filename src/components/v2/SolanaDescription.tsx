import Link from "next/link";

const SolanaDescription = () => {
  return (
    <div className={` px-[22px]`}>
      Bridging to and from Solana requires using Wormhole Portal Bridge (for
      now).
      <br />
      You will need to use an external website to bridge your coins!
      <br />
      Use the following instructions to use the Portal Bridge:
      <br />
      <br />
      1. Navigate to the{" "}
      <Link
        href="https://portalbridge.com/advanced-tools/#/transfer"
        className={`text-blue-400 underline`}
        target="_blank"
      >
        Wormhole Portal Bridge
      </Link>
      .
      <br />
      2. Select your chains, ONLY selecting Ethereum and Solana as
      source/target.
      <br />
      3. Connect your source wallet.
      <br />
      3. If Ethereum is source, paste the address{" "}
      <Link
        href="https://etherscan.io/token/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676"
        className={`text-blue-400 underline`}
        target="_blank"
      >
        0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676
      </Link>
      .
      <br />
      4. If Solana is source, paste the address{" "}
      <Link
        href="https://solscan.io/token/nBZEcHSG771mRbi4y2sSgKjfDUH8jsM2Eo5fNcASLeU"
        className={`text-blue-400 underline`}
        target="_blank"
      >
        nBZEcHSG771mRbi4y2sSgKjfDUH8jsM2Eo5fNcASLeU
      </Link>
      <br />
      5. Connect your target wallet. Verify that the addresses match the above!
      <br />
      6. Use the {"Next"} dialog button to proceed and send the tokens through
      the bridge. There will be a few transactions and long confirmation times,
      so make sure you keep the page open and complete the process!
      <br />
      <br />
      Still need support? Join the Zoomer{" "}
      <Link
        className={`text-blue-400 underline`}
        href="https://t.me/zoomercoinofficial"
        target="_blank"
      >
        Telegram
      </Link>{" "}
      and contact the mods.
    </div>
  );
};

export default SolanaDescription;
