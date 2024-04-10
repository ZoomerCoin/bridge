"use client"
import Link from "next/link";
import {Address} from "viem";
import {useReadZoomerXerc20OldBalanceOf} from "@/generated";

type CheckOldZoomerProps = {
  address?: Address;
};

const CheckOldZoomer = ({ address }: CheckOldZoomerProps) => {
  const { data: balance, isSuccess: isSuccessBalance } =
    useReadZoomerXerc20OldBalanceOf({
      args: [address] as [`0x${string}`],
      chainId: 137,
    });

  return isSuccessBalance && balance! > BigInt(0) ? (
    <div
      className={` w-full bg-yellow-100 text-yellow-800 py-3 px-6 rounded-xl flex items-center justify-center text-center my-3 `}
    >
      {/* <AlertIcon /> */}

      <span>
        You have the old Zoomer on Polygon! Please visit the{" "}
        <Link href="/migrate" className={`font-semibold underline`}>
          MIGRATION UI
        </Link>
        to migrate!
      </span>
    </div>
  ) : (
    <></>
  );
};

export default CheckOldZoomer