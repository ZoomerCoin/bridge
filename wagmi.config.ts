import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import { arbitrum, base, bsc, mainnet, optimism, polygon } from "wagmi/chains";

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });
  return {
    out: "src/generated.ts",
    contracts: [
      {
        name: "erc20",
        abi: erc20Abi,
      },
      {
        name: "ZoomerCoin",
        address: {
          [mainnet.id]: "0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676",
          [polygon.id]: "0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33",
          [base.id]: "0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2",
          [optimism.id]: "0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33",
          [bsc.id]: "0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33",
          [arbitrum.id]: "0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33",
        },
        abi: [
          {
            inputs: [],
            name: "IXERC20_NotFactory",
            type: "error",
          },
          {
            inputs: [],
            name: "IXERC20_NotHighEnoughLimits",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint256",
                name: "_mintingLimit",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "_burningLimit",
                type: "uint256",
              },
              {
                indexed: true,
                internalType: "address",
                name: "_bridge",
                type: "address",
              },
            ],
            name: "BridgeLimitsSet",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [],
            name: "EIP712DomainChanged",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
              },
            ],
            name: "Initialized",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "_lockbox",
                type: "address",
              },
            ],
            name: "LockboxSet",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "OwnershipTransferred",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [],
            name: "DOMAIN_SEPARATOR",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "FACTORY",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "allowance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "bridges",
            outputs: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "timestamp",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "ratePerSecond",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxLimit",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "currentLimit",
                    type: "uint256",
                  },
                ],
                internalType: "struct IXERC20.BridgeParameters",
                name: "minterParams",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "timestamp",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "ratePerSecond",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "maxLimit",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "currentLimit",
                    type: "uint256",
                  },
                ],
                internalType: "struct IXERC20.BridgeParameters",
                name: "burnerParams",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_user",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "burn",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_bridge",
                type: "address",
              },
            ],
            name: "burningCurrentLimitOf",
            outputs: [
              {
                internalType: "uint256",
                name: "_limit",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_bridge",
                type: "address",
              },
            ],
            name: "burningMaxLimitOf",
            outputs: [
              {
                internalType: "uint256",
                name: "_limit",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [
              {
                internalType: "uint8",
                name: "",
                type: "uint8",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
              },
            ],
            name: "decreaseAllowance",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "eip712Domain",
            outputs: [
              {
                internalType: "bytes1",
                name: "fields",
                type: "bytes1",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "version",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "chainId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "verifyingContract",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
              },
              {
                internalType: "uint256[]",
                name: "extensions",
                type: "uint256[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
              },
            ],
            name: "increaseAllowance",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "string",
                name: "_name",
                type: "string",
              },
              {
                internalType: "string",
                name: "_symbol",
                type: "string",
              },
              {
                internalType: "address",
                name: "_factory",
                type: "address",
              },
            ],
            name: "initialize",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "lockbox",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_user",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_bridge",
                type: "address",
              },
            ],
            name: "mintingCurrentLimitOf",
            outputs: [
              {
                internalType: "uint256",
                name: "_limit",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_bridge",
                type: "address",
              },
            ],
            name: "mintingMaxLimitOf",
            outputs: [
              {
                internalType: "uint256",
                name: "_limit",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "nonces",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
            ],
            name: "permit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_bridge",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_mintingLimit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_burningLimit",
                type: "uint256",
              },
            ],
            name: "setLimits",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_lockbox",
                type: "address",
              },
            ],
            name: "setLockbox",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalSupply",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "transfer",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "transferFrom",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      },
      {
        name: "ZoomerXERC20LockboxBase",
        address: {
          [mainnet.id]: "0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87",
          [polygon.id]: "0x0000000000000000000000000000000000000000",
          [base.id]: "0x0000000000000000000000000000000000000000",
          [optimism.id]: "0x0000000000000000000000000000000000000000",
          [bsc.id]: "0x0000000000000000000000000000000000000000",
          [arbitrum.id]: "0x0000000000000000000000000000000000000000",
        },
        abi: [
          { inputs: [], name: "IXERC20Lockbox_Native", type: "error" },
          { inputs: [], name: "IXERC20Lockbox_NotNative", type: "error" },
          { inputs: [], name: "IXERC20Lockbox_WithdrawFailed", type: "error" },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "_sender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "Deposit",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
              },
            ],
            name: "Initialized",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "_sender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "Withdraw",
            type: "event",
          },
          {
            inputs: [],
            name: "ERC20",
            outputs: [
              { internalType: "contract IERC20", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "IS_NATIVE",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "OWNER",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "OpL1XERC20BRIDGE",
            outputs: [
              {
                internalType: "contract OpL1XERC20Bridge",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "XERC20",
            outputs: [
              { internalType: "contract IXERC20", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "deposit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "deposit",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "depositAndBridgeToL2",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "_xerc20", type: "address" },
              { internalType: "address", name: "_erc20", type: "address" },
              { internalType: "bool", name: "_isNative", type: "bool" },
            ],
            name: "initialize",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "bytes[]", name: "data", type: "bytes[]" },
            ],
            name: "multicall",
            outputs: [
              { internalType: "bytes[]", name: "results", type: "bytes[]" },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_opL1XERC20Bridge",
                type: "address",
              },
            ],
            name: "setOpL1XERC20Bridge",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          { stateMutability: "payable", type: "receive" },
        ],
      },
      {
        name: "Bridge",
        address: {
          [mainnet.id]: "0xDDFC70d9932ea7297724b621CcCb17bFF96995DD",
          [polygon.id]: "0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A",
          [optimism.id]: "0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A",
          [bsc.id]: "0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393",
          [arbitrum.id]: "0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A",
          [base.id]: "0x0000000000000000000000000000000000000000",
        },
        abi: [
          {
            inputs: [
              {
                internalType: "enum Bridge.BridgeType",
                name: "_bridgeType",
                type: "uint8",
              },
            ],
            name: "BridgeContractNotSet",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "uint32",
                name: "_destinationChainId",
                type: "uint32",
              },
            ],
            name: "DestinationChainNotSupported",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "uint32",
                name: "_fee",
                type: "uint32",
              },
            ],
            name: "FeeOutOfBounds",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidBridgeType",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_length1",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_length2",
                type: "uint256",
              },
            ],
            name: "LengthsMustMatch",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
              },
            ],
            name: "Initialized",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "OwnershipTransferStarted",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "OwnershipTransferred",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "Paused",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "Unpaused",
            type: "event",
          },
          {
            inputs: [],
            name: "acceptOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "enum Bridge.BridgeType",
                name: "",
                type: "uint8",
              },
            ],
            name: "bridges",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint32",
                name: "",
                type: "uint32",
              },
            ],
            name: "connextChainIdToDomain",
            outputs: [
              {
                internalType: "uint32",
                name: "",
                type: "uint32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "fee",
            outputs: [
              {
                internalType: "uint32",
                name: "",
                type: "uint32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint32",
                name: "_fee",
                type: "uint32",
              },
              {
                internalType: "enum Bridge.BridgeType[]",
                name: "_bridgeTypes",
                type: "uint8[]",
              },
              {
                internalType: "address[]",
                name: "_bridges",
                type: "address[]",
              },
            ],
            name: "initialize",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "paused",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "pendingOwner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_token",
                type: "address",
              },
              {
                internalType: "address",
                name: "_recipient",
                type: "address",
              },
              {
                internalType: "uint32",
                name: "_destinationChainId",
                type: "uint32",
              },
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
              },
              {
                internalType: "enum Bridge.BridgeType",
                name: "_bridgeType",
                type: "uint8",
              },
              {
                internalType: "bytes",
                name: "_extraData",
                type: "bytes",
              },
            ],
            name: "sendThroughBridge",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "enum Bridge.BridgeType",
                name: "_bridgeType",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "_bridge",
                type: "address",
              },
            ],
            name: "setBridge",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint32[]",
                name: "_chainId",
                type: "uint32[]",
              },
              {
                internalType: "uint32[]",
                name: "_connextDomain",
                type: "uint32[]",
              },
            ],
            name: "setDomains",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint32",
                name: "_fee",
                type: "uint32",
              },
            ],
            name: "setFee",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_token",
                type: "address",
              },
              {
                internalType: "address",
                name: "_recipient",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      },
      {
        name: "ZoomerXERC20Old",
        address: "0xb2588731d8f6F854037936d6ffac4c13d0b6bd62",
        abi: [
          { inputs: [], stateMutability: "nonpayable", type: "constructor" },
          { inputs: [], name: "XERC20__addBridge_alreadyAdded", type: "error" },
          { inputs: [], name: "XERC20__onlyBridge_notBridge", type: "error" },
          {
            inputs: [],
            name: "XERC20__removeBridge_alreadyRemoved",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "bridge",
                type: "address",
              },
            ],
            name: "BridgeAdded",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "bridge",
                type: "address",
              },
            ],
            name: "BridgeRemoved",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [],
            name: "EIP712DomainChanged",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
              },
            ],
            name: "Initialized",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "proposedOwner",
                type: "address",
              },
            ],
            name: "OwnershipProposed",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "OwnershipTransferred",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [],
            name: "DOMAIN_SEPARATOR",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "acceptProposedOwner",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "_bridge", type: "address" },
            ],
            name: "addBridge",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "address", name: "spender", type: "address" },
            ],
            name: "allowance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "_from", type: "address" },
              { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "burn",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
              },
            ],
            name: "decreaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "delay",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "eip712Domain",
            outputs: [
              { internalType: "bytes1", name: "fields", type: "bytes1" },
              { internalType: "string", name: "name", type: "string" },
              { internalType: "string", name: "version", type: "string" },
              { internalType: "uint256", name: "chainId", type: "uint256" },
              {
                internalType: "address",
                name: "verifyingContract",
                type: "address",
              },
              { internalType: "bytes32", name: "salt", type: "bytes32" },
              {
                internalType: "uint256[]",
                name: "extensions",
                type: "uint256[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "addedValue", type: "uint256" },
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "_owner", type: "address" },
              { internalType: "string", name: "_name", type: "string" },
              { internalType: "string", name: "_symbol", type: "string" },
            ],
            name: "initialize",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "_to", type: "address" },
              { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "owner", type: "address" },
            ],
            name: "nonces",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "value", type: "uint256" },
              { internalType: "uint256", name: "deadline", type: "uint256" },
              { internalType: "uint8", name: "v", type: "uint8" },
              { internalType: "bytes32", name: "r", type: "bytes32" },
              { internalType: "bytes32", name: "s", type: "bytes32" },
            ],
            name: "permit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newlyProposed",
                type: "address",
              },
            ],
            name: "proposeNewOwner",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "proposed",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "proposedTimestamp",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "_bridge", type: "address" },
            ],
            name: "removeBridge",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "renounced",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "from", type: "address" },
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      },
      {
        name: "CCIPxERC20Bridge",
        address: {
          [mainnet.id]: "0x5B39b483DDa8bae818989F6bCC9c18E99d103478",
          [base.id]: "0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602",
          [arbitrum.id]: "0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a",
          [optimism.id]: "0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a",
          [polygon.id]: "0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51",
          [bsc.id]: "0x840854c007c1E5F64074350beECa088F8a8e48BF",
        },
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_router", type: "address" },
              { internalType: "address", name: "_link", type: "address" },
              { internalType: "address", name: "_xerc20", type: "address" },
              { internalType: "uint256", name: "_feeBps", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "address", name: "target", type: "address" },
              { internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "FailedToWithdrawEth",
            type: "error",
          },
          {
            inputs: [
              { internalType: "address", name: "router", type: "address" },
            ],
            name: "InvalidRouter",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "uint64",
                name: "destinationChainSelector",
                type: "uint64",
              },
            ],
            name: "NoReceiverForDestinationChain",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "currentBalance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "calculatedFees",
                type: "uint256",
              },
            ],
            name: "NotEnoughBalance",
            type: "error",
          },
          { inputs: [], name: "NothingToWithdraw", type: "error" },
          {
            inputs: [
              {
                internalType: "uint64",
                name: "sourceChainSelector",
                type: "uint64",
              },
              { internalType: "address", name: "sender", type: "address" },
            ],
            name: "SenderNotAllowlistedBySourceChain",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "messageId",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "sourceChainSelector",
                type: "uint64",
              },
              {
                indexed: false,
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
            ],
            name: "MessageReceived",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "messageId",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "destinationChainSelector",
                type: "uint64",
              },
              {
                indexed: false,
                internalType: "address",
                name: "receiver",
                type: "address",
              },
              {
                indexed: false,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "address",
                name: "feeToken",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "fees",
                type: "uint256",
              },
            ],
            name: "MessageSent",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
            ],
            name: "OwnershipTransferRequested",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
            ],
            name: "OwnershipTransferred",
            type: "event",
          },
          {
            inputs: [],
            name: "acceptOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint64",
                name: "_chainSelector",
                type: "uint64",
              },
              { internalType: "address", name: "_bridge", type: "address" },
            ],
            name: "addBridgeForChain",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "uint32", name: "_chainId", type: "uint32" },
              {
                internalType: "uint64",
                name: "_chainSelector",
                type: "uint64",
              },
            ],
            name: "addChainIdToChainSelector",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint32",
                name: "_destinationChainId",
                type: "uint32",
              },
              { internalType: "address", name: "_receipient", type: "address" },
              { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "bridgeTokens",
            outputs: [
              { internalType: "bytes32", name: "messageId", type: "bytes32" },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint32",
                name: "_destinationChainId",
                type: "uint32",
              },
              { internalType: "address", name: "_receipient", type: "address" },
              { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "bridgeTokensWithLINK",
            outputs: [
              { internalType: "bytes32", name: "messageId", type: "bytes32" },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "uint64", name: "", type: "uint64" }],
            name: "bridgesByChain",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "messageId",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint64",
                    name: "sourceChainSelector",
                    type: "uint64",
                  },
                  { internalType: "bytes", name: "sender", type: "bytes" },
                  { internalType: "bytes", name: "data", type: "bytes" },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "token",
                        type: "address",
                      },
                      {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct Client.EVMTokenAmount[]",
                    name: "destTokenAmounts",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct Client.Any2EVMMessage",
                name: "message",
                type: "tuple",
              },
            ],
            name: "ccipReceive",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            name: "chainIdToChainSelector",
            outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "feeBps",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint32",
                name: "_destinationChainId",
                type: "uint32",
              },
              { internalType: "uint256", name: "_amount", type: "uint256" },
              { internalType: "bool", name: "_feeInLINK", type: "bool" },
            ],
            name: "getFee",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getLastReceivedMessageDetails",
            outputs: [
              { internalType: "bytes32", name: "messageId", type: "bytes32" },
              { internalType: "string", name: "text", type: "string" },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getRouter",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "linkToken",
            outputs: [
              { internalType: "contract IERC20", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "uint256", name: "_feeBps", type: "uint256" },
            ],
            name: "setFeeBps",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
            ],
            name: "supportsInterface",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "to", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_beneficiary",
                type: "address",
              },
            ],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_beneficiary",
                type: "address",
              },
              { internalType: "address", name: "_token", type: "address" },
            ],
            name: "withdrawToken",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "xerc20",
            outputs: [
              { internalType: "contract IXERC20", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
          },
          { stateMutability: "payable", type: "receive" },
        ],
      },
    ],
    plugins: [
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY!,
        chainId: mainnet.id,
        contracts: [
          {
            name: "GrumpyCatCoin",
            address: {
              [mainnet.id]: "0xd8E2D95C8614F28169757cD6445a71c291dEc5bF",
              [polygon.id]: "0x3B350F202473932411772C8Cb76DB7975f42397E",
              [optimism.id]: "0x3B350F202473932411772C8Cb76DB7975f42397E",
              [bsc.id]: "0x3B350F202473932411772C8Cb76DB7975f42397E",
              [arbitrum.id]: "0x3B350F202473932411772C8Cb76DB7975f42397E",
            },
          },
          {
            name: "GrumpyCatLockboxAdapter",
            address: {
              [mainnet.id]: "0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7",
            },
          },
          {
            name: "ZoomerXERC20LockboxAll",
            address: {
              [mainnet.id]: "0xB3bC2AaabB4C27890dBB491550eac3843A946625",
            },
          },
        ],
      }),
      etherscan({
        apiKey: env.POLYGONSCAN_API_KEY!,
        chainId: polygon.id,
        contracts: [
          {
            name: "ZoomerMigrator",
            address: {
              [polygon.id]: "0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7",
            },
          },
        ],
      }),
      react(),
    ],
  };
});
