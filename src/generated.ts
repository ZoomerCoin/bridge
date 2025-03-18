import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Bridge
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const bridgeAbi = [
  {
    type: 'error',
    inputs: [
      {
        name: '_bridgeType',
        internalType: 'enum Bridge.BridgeType',
        type: 'uint8',
      },
    ],
    name: 'BridgeContractNotSet',
  },
  {
    type: 'error',
    inputs: [
      { name: '_destinationChainId', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'DestinationChainNotSupported',
  },
  {
    type: 'error',
    inputs: [{ name: '_fee', internalType: 'uint32', type: 'uint32' }],
    name: 'FeeOutOfBounds',
  },
  { type: 'error', inputs: [], name: 'InvalidBridgeType' },
  {
    type: 'error',
    inputs: [
      { name: '_length1', internalType: 'uint256', type: 'uint256' },
      { name: '_length2', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'LengthsMustMatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'enum Bridge.BridgeType', type: 'uint8' },
    ],
    name: 'bridges',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    name: 'connextChainIdToDomain',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_fee', internalType: 'uint32', type: 'uint32' },
      {
        name: '_bridgeTypes',
        internalType: 'enum Bridge.BridgeType[]',
        type: 'uint8[]',
      },
      { name: '_bridges', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_destinationChainId', internalType: 'uint32', type: 'uint32' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
      {
        name: '_bridgeType',
        internalType: 'enum Bridge.BridgeType',
        type: 'uint8',
      },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'sendThroughBridge',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_bridgeType',
        internalType: 'enum Bridge.BridgeType',
        type: 'uint8',
      },
      { name: '_bridge', internalType: 'address', type: 'address' },
    ],
    name: 'setBridge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_chainId', internalType: 'uint32[]', type: 'uint32[]' },
      { name: '_connextDomain', internalType: 'uint32[]', type: 'uint32[]' },
    ],
    name: 'setDomains',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_fee', internalType: 'uint32', type: 'uint32' }],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const bridgeAddress = {
  1: '0xDDFC70d9932ea7297724b621CcCb17bFF96995DD',
  10: '0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A',
  56: '0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393',
  137: '0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A',
  8453: '0x0000000000000000000000000000000000000000',
  42161: '0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const bridgeConfig = { address: bridgeAddress, abi: bridgeAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CCIPxERC20Bridge
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const cciPxErc20BridgeAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_router', internalType: 'address', type: 'address' },
      { name: '_link', internalType: 'address', type: 'address' },
      { name: '_xerc20', internalType: 'address', type: 'address' },
      { name: '_feeBps', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'FailedToWithdrawEth',
  },
  {
    type: 'error',
    inputs: [{ name: 'router', internalType: 'address', type: 'address' }],
    name: 'InvalidRouter',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'destinationChainSelector',
        internalType: 'uint64',
        type: 'uint64',
      },
    ],
    name: 'NoReceiverForDestinationChain',
  },
  {
    type: 'error',
    inputs: [
      { name: 'currentBalance', internalType: 'uint256', type: 'uint256' },
      { name: 'calculatedFees', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NotEnoughBalance',
  },
  { type: 'error', inputs: [], name: 'NothingToWithdraw' },
  {
    type: 'error',
    inputs: [
      { name: 'sourceChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'SenderNotAllowlistedBySourceChain',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'messageId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sourceChainSelector',
        internalType: 'uint64',
        type: 'uint64',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MessageReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'messageId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'destinationChainSelector',
        internalType: 'uint64',
        type: 'uint64',
        indexed: true,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'feeToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'fees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MessageSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_chainSelector', internalType: 'uint64', type: 'uint64' },
      { name: '_bridge', internalType: 'address', type: 'address' },
    ],
    name: 'addBridgeForChain',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_chainId', internalType: 'uint32', type: 'uint32' },
      { name: '_chainSelector', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'addChainIdToChainSelector',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_destinationChainId', internalType: 'uint32', type: 'uint32' },
      { name: '_receipient', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'bridgeTokens',
    outputs: [{ name: 'messageId', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_destinationChainId', internalType: 'uint32', type: 'uint32' },
      { name: '_receipient', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'bridgeTokensWithLINK',
    outputs: [{ name: 'messageId', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    name: 'bridgesByChain',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'message',
        internalType: 'struct Client.Any2EVMMessage',
        type: 'tuple',
        components: [
          { name: 'messageId', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'sourceChainSelector',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'sender', internalType: 'bytes', type: 'bytes' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          {
            name: 'destTokenAmounts',
            internalType: 'struct Client.EVMTokenAmount[]',
            type: 'tuple[]',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'ccipReceive',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    name: 'chainIdToChainSelector',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeBps',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_destinationChainId', internalType: 'uint32', type: 'uint32' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_feeInLINK', internalType: 'bool', type: 'bool' },
    ],
    name: 'getFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastReceivedMessageDetails',
    outputs: [
      { name: 'messageId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'text', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRouter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'linkToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_feeBps', internalType: 'uint256', type: 'uint256' }],
    name: 'setFeeBps',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_beneficiary', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'xerc20',
    outputs: [{ name: '', internalType: 'contract IXERC20', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const cciPxErc20BridgeAddress = {
  1: '0x5B39b483DDa8bae818989F6bCC9c18E99d103478',
  10: '0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a',
  56: '0x840854c007c1E5F64074350beECa088F8a8e48BF',
  137: '0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51',
  8453: '0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602',
  42161: '0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const cciPxErc20BridgeConfig = {
  address: cciPxErc20BridgeAddress,
  abi: cciPxErc20BridgeAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GrumpyCatCoin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const grumpyCatCoinAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_maxWalletTimer', internalType: 'uint256', type: 'uint256' },
      { name: '_airdropLimit', internalType: 'uint256', type: 'uint256' },
      { name: '_CEXWallet', internalType: 'address', type: 'address' },
      { name: '_end', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Airdropped',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [{ name: 'toPair', internalType: 'address', type: 'address' }],
    name: 'addPair',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipients', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'airdrop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'airdropLimit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'burntGrumpyCat',
    outputs: [
      { name: '', internalType: 'contract BurntGrumpyCat', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxWallet',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxWalletTimer',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const grumpyCatCoinAddress = {
  1: '0xd8E2D95C8614F28169757cD6445a71c291dEc5bF',
  10: '0x3B350F202473932411772C8Cb76DB7975f42397E',
  56: '0x3B350F202473932411772C8Cb76DB7975f42397E',
  137: '0x3B350F202473932411772C8Cb76DB7975f42397E',
  42161: '0x3B350F202473932411772C8Cb76DB7975f42397E',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const grumpyCatCoinConfig = {
  address: grumpyCatCoinAddress,
  abi: grumpyCatCoinAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GrumpyCatLockboxAdapter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const grumpyCatLockboxAdapterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_connext', internalType: 'address', type: 'address' },
      { name: '_lockbox', internalType: 'address', type: 'address' },
      { name: '_erc20', internalType: 'address', type: 'address' },
      { name: '_xerc20', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'XReceiver__onlyConnext',
  },
  {
    type: 'function',
    inputs: [],
    name: 'connext',
    outputs: [{ name: '', internalType: 'contract IConnext', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'erc20',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lockbox',
    outputs: [
      { name: '', internalType: 'contract IXERC20Lockbox', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_transferId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_asset', internalType: 'address', type: 'address' },
      { name: '_originSender', internalType: 'address', type: 'address' },
      { name: '_origin', internalType: 'uint32', type: 'uint32' },
      { name: '_callData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'xReceive',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_destination', internalType: 'uint32', type: 'uint32' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_asset', internalType: 'address', type: 'address' },
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_slippage', internalType: 'uint256', type: 'uint256' },
      { name: '_callData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'xcall',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'xerc20',
    outputs: [{ name: '', internalType: 'contract IXERC20', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const grumpyCatLockboxAdapterAddress = {
  1: '0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const grumpyCatLockboxAdapterConfig = {
  address: grumpyCatLockboxAdapterAddress,
  abi: grumpyCatLockboxAdapterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZoomerCoin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const zoomerCoinAbi = [
  { type: 'error', inputs: [], name: 'IXERC20_NotFactory' },
  { type: 'error', inputs: [], name: 'IXERC20_NotHighEnoughLimits' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_mintingLimit',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_burningLimit',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_bridge',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BridgeLimitsSet',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_lockbox',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LockboxSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FACTORY',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'bridges',
    outputs: [
      {
        name: 'minterParams',
        internalType: 'struct IXERC20.BridgeParameters',
        type: 'tuple',
        components: [
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'ratePerSecond', internalType: 'uint256', type: 'uint256' },
          { name: 'maxLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'currentLimit', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'burnerParams',
        internalType: 'struct IXERC20.BridgeParameters',
        type: 'tuple',
        components: [
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'ratePerSecond', internalType: 'uint256', type: 'uint256' },
          { name: 'maxLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'currentLimit', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_bridge', internalType: 'address', type: 'address' }],
    name: 'burningCurrentLimitOf',
    outputs: [{ name: '_limit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_bridge', internalType: 'address', type: 'address' }],
    name: 'burningMaxLimitOf',
    outputs: [{ name: '_limit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_factory', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lockbox',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_bridge', internalType: 'address', type: 'address' }],
    name: 'mintingCurrentLimitOf',
    outputs: [{ name: '_limit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_bridge', internalType: 'address', type: 'address' }],
    name: 'mintingMaxLimitOf',
    outputs: [{ name: '_limit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_bridge', internalType: 'address', type: 'address' },
      { name: '_mintingLimit', internalType: 'uint256', type: 'uint256' },
      { name: '_burningLimit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setLimits',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_lockbox', internalType: 'address', type: 'address' }],
    name: 'setLockbox',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const zoomerCoinAddress = {
  1: '0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676',
  10: '0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33',
  56: '0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33',
  137: '0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33',
  8453: '0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2',
  42161: '0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const zoomerCoinConfig = {
  address: zoomerCoinAddress,
  abi: zoomerCoinAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZoomerMigrator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const zoomerMigratorAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_oldZoomer', internalType: 'address', type: 'address' },
      { name: '_newZoomer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'newAuthority',
        internalType: 'contract Authority',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AuthorityUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnerUpdated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'NEW_ZOOMER',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OLD_ZOOMER',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [
      { name: '', internalType: 'contract Authority', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'migrate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'migrate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'rescue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newAuthority',
        internalType: 'contract Authority',
        type: 'address',
      },
    ],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const zoomerMigratorAddress = {
  137: '0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7',
} as const

/**
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const zoomerMigratorConfig = {
  address: zoomerMigratorAddress,
  abi: zoomerMigratorAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZoomerXERC20LockboxAll
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const zoomerXerc20LockboxAllAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_xerc20', internalType: 'address', type: 'address' },
      { name: '_erc20', internalType: 'address', type: 'address' },
      { name: '_isNative', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'IXERC20Lockbox_Native' },
  { type: 'error', inputs: [], name: 'IXERC20Lockbox_NotNative' },
  { type: 'error', inputs: [], name: 'IXERC20Lockbox_WithdrawFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ERC20',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'IS_NATIVE',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'XERC20',
    outputs: [{ name: '', internalType: 'contract IXERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'depositNative',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_to', internalType: 'address', type: 'address' }],
    name: 'depositNativeTo',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const zoomerXerc20LockboxAllAddress = {
  1: '0xB3bC2AaabB4C27890dBB491550eac3843A946625',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const zoomerXerc20LockboxAllConfig = {
  address: zoomerXerc20LockboxAllAddress,
  abi: zoomerXerc20LockboxAllAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZoomerXERC20LockboxBase
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const zoomerXerc20LockboxBaseAbi = [
  { type: 'error', inputs: [], name: 'IXERC20Lockbox_Native' },
  { type: 'error', inputs: [], name: 'IXERC20Lockbox_NotNative' },
  { type: 'error', inputs: [], name: 'IXERC20Lockbox_WithdrawFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ERC20',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'IS_NATIVE',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OWNER',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OpL1XERC20BRIDGE',
    outputs: [
      { name: '', internalType: 'contract OpL1XERC20Bridge', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'XERC20',
    outputs: [{ name: '', internalType: 'contract IXERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'depositAndBridgeToL2',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_xerc20', internalType: 'address', type: 'address' },
      { name: '_erc20', internalType: 'address', type: 'address' },
      { name: '_isNative', internalType: 'bool', type: 'bool' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_opL1XERC20Bridge', internalType: 'address', type: 'address' },
    ],
    name: 'setOpL1XERC20Bridge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const zoomerXerc20LockboxBaseAddress = {
  1: '0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87',
  10: '0x0000000000000000000000000000000000000000',
  56: '0x0000000000000000000000000000000000000000',
  137: '0x0000000000000000000000000000000000000000',
  8453: '0x0000000000000000000000000000000000000000',
  42161: '0x0000000000000000000000000000000000000000',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const zoomerXerc20LockboxBaseConfig = {
  address: zoomerXerc20LockboxBaseAddress,
  abi: zoomerXerc20LockboxBaseAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZoomerXERC20Old
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const zoomerXerc20OldAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'XERC20__addBridge_alreadyAdded' },
  { type: 'error', inputs: [], name: 'XERC20__onlyBridge_notBridge' },
  { type: 'error', inputs: [], name: 'XERC20__removeBridge_alreadyRemoved' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bridge',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BridgeAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bridge',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BridgeRemoved',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposedOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipProposed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptProposedOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_bridge', internalType: 'address', type: 'address' }],
    name: 'addBridge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'delay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newlyProposed', internalType: 'address', type: 'address' },
    ],
    name: 'proposeNewOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proposed',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proposedTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_bridge', internalType: 'address', type: 'address' }],
    name: 'removeBridge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounced',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

export const zoomerXerc20OldAddress =
  '0xb2588731d8f6F854037936d6ffac4c13d0b6bd62' as const

export const zoomerXerc20OldConfig = {
  address: zoomerXerc20OldAddress,
  abi: zoomerXerc20OldAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bridgeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useReadBridge = /*#__PURE__*/ createUseReadContract({
  abi: bridgeAbi,
  address: bridgeAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"bridges"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useReadBridgeBridges = /*#__PURE__*/ createUseReadContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'bridges',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"connextChainIdToDomain"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useReadBridgeConnextChainIdToDomain =
  /*#__PURE__*/ createUseReadContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'connextChainIdToDomain',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"fee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useReadBridgeFee = /*#__PURE__*/ createUseReadContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'fee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useReadBridgeOwner = /*#__PURE__*/ createUseReadContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useReadBridgePaused = /*#__PURE__*/ createUseReadContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useReadBridgePendingOwner = /*#__PURE__*/ createUseReadContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridge = /*#__PURE__*/ createUseWriteContract({
  abi: bridgeAbi,
  address: bridgeAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"sendThroughBridge"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeSendThroughBridge =
  /*#__PURE__*/ createUseWriteContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'sendThroughBridge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"setBridge"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeSetBridge = /*#__PURE__*/ createUseWriteContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'setBridge',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"setDomains"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeSetDomains = /*#__PURE__*/ createUseWriteContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'setDomains',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"setFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeSetFee = /*#__PURE__*/ createUseWriteContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'setFee',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWriteBridgeWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridge = /*#__PURE__*/ createUseSimulateContract({
  abi: bridgeAbi,
  address: bridgeAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"sendThroughBridge"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeSendThroughBridge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'sendThroughBridge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"setBridge"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeSetBridge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'setBridge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"setDomains"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeSetDomains =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'setDomains',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"setFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeSetFee = /*#__PURE__*/ createUseSimulateContract({
  abi: bridgeAbi,
  address: bridgeAddress,
  functionName: 'setFee',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bridgeAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useSimulateBridgeWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bridgeAbi,
    address: bridgeAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bridgeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWatchBridgeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: bridgeAbi,
  address: bridgeAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bridgeAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWatchBridgeInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bridgeAbi,
    address: bridgeAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bridgeAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWatchBridgeOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bridgeAbi,
    address: bridgeAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bridgeAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWatchBridgeOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bridgeAbi,
    address: bridgeAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bridgeAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWatchBridgePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bridgeAbi,
    address: bridgeAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bridgeAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xDDFC70d9932ea7297724b621CcCb17bFF96995DD)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xF9479E3DB37F75Dc2f6B1d51a5D2dbE40eBF5393)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x64d80a46C4183A3B9CBca6dAEA8B3397C43FA13A)
 */
export const useWatchBridgeUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bridgeAbi,
    address: bridgeAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20Bridge = /*#__PURE__*/ createUseReadContract({
  abi: cciPxErc20BridgeAbi,
  address: cciPxErc20BridgeAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"bridgesByChain"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeBridgesByChain =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'bridgesByChain',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"chainIdToChainSelector"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeChainIdToChainSelector =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'chainIdToChainSelector',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"feeBps"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'feeBps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"getFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeGetFee =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'getFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"getLastReceivedMessageDetails"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeGetLastReceivedMessageDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'getLastReceivedMessageDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"getRouter"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeGetRouter =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'getRouter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"linkToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeLinkToken =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'linkToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeOwner = /*#__PURE__*/ createUseReadContract(
  {
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'owner',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"xerc20"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useReadCciPxErc20BridgeXerc20 =
  /*#__PURE__*/ createUseReadContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'xerc20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20Bridge = /*#__PURE__*/ createUseWriteContract({
  abi: cciPxErc20BridgeAbi,
  address: cciPxErc20BridgeAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"addBridgeForChain"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeAddBridgeForChain =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'addBridgeForChain',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"addChainIdToChainSelector"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeAddChainIdToChainSelector =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'addChainIdToChainSelector',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"bridgeTokens"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeBridgeTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'bridgeTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"bridgeTokensWithLINK"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeBridgeTokensWithLink =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'bridgeTokensWithLINK',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"ccipReceive"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeCcipReceive =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'ccipReceive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"setFeeBps"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeSetFeeBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'setFeeBps',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"withdrawToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWriteCciPxErc20BridgeWithdrawToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'withdrawToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20Bridge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"addBridgeForChain"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeAddBridgeForChain =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'addBridgeForChain',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"addChainIdToChainSelector"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeAddChainIdToChainSelector =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'addChainIdToChainSelector',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"bridgeTokens"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeBridgeTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'bridgeTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"bridgeTokensWithLINK"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeBridgeTokensWithLink =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'bridgeTokensWithLINK',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"ccipReceive"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeCcipReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'ccipReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"setFeeBps"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeSetFeeBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'setFeeBps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `functionName` set to `"withdrawToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useSimulateCciPxErc20BridgeWithdrawToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    functionName: 'withdrawToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWatchCciPxErc20BridgeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `eventName` set to `"MessageReceived"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWatchCciPxErc20BridgeMessageReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    eventName: 'MessageReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `eventName` set to `"MessageSent"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWatchCciPxErc20BridgeMessageSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    eventName: 'MessageSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `eventName` set to `"OwnershipTransferRequested"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWatchCciPxErc20BridgeOwnershipTransferRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    eventName: 'OwnershipTransferRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cciPxErc20BridgeAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5B39b483DDa8bae818989F6bCC9c18E99d103478)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x840854c007c1E5F64074350beECa088F8a8e48BF)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB2e04651aC165CB6D2b8B0442ab25231DEf15b51)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xF93Aba36FfC4D357dD616679045C7d1bFA5e5602)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0337c7b958aC69A9e35b1Be47D96b8e058f9222a)
 */
export const useWatchCciPxErc20BridgeOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cciPxErc20BridgeAbi,
    address: cciPxErc20BridgeAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoin = /*#__PURE__*/ createUseReadContract({
  abi: grumpyCatCoinAbi,
  address: grumpyCatCoinAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"airdropLimit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinAirdropLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'airdropLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"burntGrumpyCat"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinBurntGrumpyCat =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'burntGrumpyCat',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinDecimals = /*#__PURE__*/ createUseReadContract(
  {
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'decimals',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"maxWallet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinMaxWallet =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'maxWallet',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"maxWalletTimer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinMaxWalletTimer =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'maxWalletTimer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinName = /*#__PURE__*/ createUseReadContract({
  abi: grumpyCatCoinAbi,
  address: grumpyCatCoinAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinOwner = /*#__PURE__*/ createUseReadContract({
  abi: grumpyCatCoinAbi,
  address: grumpyCatCoinAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinSymbol = /*#__PURE__*/ createUseReadContract({
  abi: grumpyCatCoinAbi,
  address: grumpyCatCoinAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useReadGrumpyCatCoinTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoin = /*#__PURE__*/ createUseWriteContract({
  abi: grumpyCatCoinAbi,
  address: grumpyCatCoinAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"addPair"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinAddPair =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'addPair',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"airdrop"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinAirdrop =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'airdrop',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinBurn = /*#__PURE__*/ createUseWriteContract({
  abi: grumpyCatCoinAbi,
  address: grumpyCatCoinAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWriteGrumpyCatCoinTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoin = /*#__PURE__*/ createUseSimulateContract(
  { abi: grumpyCatCoinAbi, address: grumpyCatCoinAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"addPair"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinAddPair =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'addPair',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"airdrop"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinAirdrop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'airdrop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useSimulateGrumpyCatCoinTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link grumpyCatCoinAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWatchGrumpyCatCoinEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `eventName` set to `"Airdropped"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWatchGrumpyCatCoinAirdroppedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    eventName: 'Airdropped',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWatchGrumpyCatCoinApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWatchGrumpyCatCoinOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link grumpyCatCoinAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd8E2D95C8614F28169757cD6445a71c291dEc5bF)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x3B350F202473932411772C8Cb76DB7975f42397E)
 */
export const useWatchGrumpyCatCoinTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: grumpyCatCoinAbi,
    address: grumpyCatCoinAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadGrumpyCatLockboxAdapter =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__ and `functionName` set to `"connext"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadGrumpyCatLockboxAdapterConnext =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
    functionName: 'connext',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__ and `functionName` set to `"erc20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadGrumpyCatLockboxAdapterErc20 =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
    functionName: 'erc20',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__ and `functionName` set to `"lockbox"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadGrumpyCatLockboxAdapterLockbox =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
    functionName: 'lockbox',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__ and `functionName` set to `"xerc20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadGrumpyCatLockboxAdapterXerc20 =
  /*#__PURE__*/ createUseReadContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
    functionName: 'xerc20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWriteGrumpyCatLockboxAdapter =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__ and `functionName` set to `"xReceive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWriteGrumpyCatLockboxAdapterXReceive =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
    functionName: 'xReceive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__ and `functionName` set to `"xcall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWriteGrumpyCatLockboxAdapterXcall =
  /*#__PURE__*/ createUseWriteContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
    functionName: 'xcall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useSimulateGrumpyCatLockboxAdapter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__ and `functionName` set to `"xReceive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useSimulateGrumpyCatLockboxAdapterXReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
    functionName: 'xReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link grumpyCatLockboxAdapterAbi}__ and `functionName` set to `"xcall"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useSimulateGrumpyCatLockboxAdapterXcall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: grumpyCatLockboxAdapterAbi,
    address: grumpyCatLockboxAdapterAddress,
    functionName: 'xcall',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoin = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"FACTORY"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinFactory = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'FACTORY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinAllowance = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"bridges"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinBridges = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'bridges',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"burningCurrentLimitOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinBurningCurrentLimitOf =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'burningCurrentLimitOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"burningMaxLimitOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinBurningMaxLimitOf =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'burningMaxLimitOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinDecimals = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"eip712Domain"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinEip712Domain =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'eip712Domain',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"lockbox"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinLockbox = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'lockbox',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"mintingCurrentLimitOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinMintingCurrentLimitOf =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'mintingCurrentLimitOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"mintingMaxLimitOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinMintingMaxLimitOf =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'mintingMaxLimitOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinName = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"nonces"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinNonces = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinOwner = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinSymbol = /*#__PURE__*/ createUseReadContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useReadZoomerCoinTotalSupply = /*#__PURE__*/ createUseReadContract(
  {
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'totalSupply',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoin = /*#__PURE__*/ createUseWriteContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinApprove = /*#__PURE__*/ createUseWriteContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinBurn = /*#__PURE__*/ createUseWriteContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinMint = /*#__PURE__*/ createUseWriteContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinPermit = /*#__PURE__*/ createUseWriteContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"setLimits"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinSetLimits = /*#__PURE__*/ createUseWriteContract(
  { abi: zoomerCoinAbi, address: zoomerCoinAddress, functionName: 'setLimits' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"setLockbox"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinSetLockbox =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'setLockbox',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWriteZoomerCoinTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoin = /*#__PURE__*/ createUseSimulateContract({
  abi: zoomerCoinAbi,
  address: zoomerCoinAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"setLimits"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinSetLimits =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'setLimits',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"setLockbox"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinSetLockbox =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'setLockbox',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerCoinAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useSimulateZoomerCoinTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerCoinAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWatchZoomerCoinEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerCoinAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWatchZoomerCoinApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerCoinAbi}__ and `eventName` set to `"BridgeLimitsSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWatchZoomerCoinBridgeLimitsSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    eventName: 'BridgeLimitsSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerCoinAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWatchZoomerCoinEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    eventName: 'EIP712DomainChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerCoinAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWatchZoomerCoinInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerCoinAbi}__ and `eventName` set to `"LockboxSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWatchZoomerCoinLockboxSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    eventName: 'LockboxSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerCoinAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWatchZoomerCoinOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerCoinAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD1dB4851bcF5B41442cAA32025Ce0Afe6B8EabC2)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xB962150760F9A3bB00e3E9Cf48297EE20AdA4A33)
 */
export const useWatchZoomerCoinTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerCoinAbi,
    address: zoomerCoinAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerMigratorAbi}__
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadZoomerMigrator = /*#__PURE__*/ createUseReadContract({
  abi: zoomerMigratorAbi,
  address: zoomerMigratorAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"NEW_ZOOMER"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadZoomerMigratorNewZoomer =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'NEW_ZOOMER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"OLD_ZOOMER"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadZoomerMigratorOldZoomer =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'OLD_ZOOMER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"authority"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadZoomerMigratorAuthority =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'authority',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useReadZoomerMigratorOwner = /*#__PURE__*/ createUseReadContract({
  abi: zoomerMigratorAbi,
  address: zoomerMigratorAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerMigratorAbi}__
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWriteZoomerMigrator = /*#__PURE__*/ createUseWriteContract({
  abi: zoomerMigratorAbi,
  address: zoomerMigratorAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"migrate"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWriteZoomerMigratorMigrate =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'migrate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"rescue"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWriteZoomerMigratorRescue =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'rescue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"setAuthority"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWriteZoomerMigratorSetAuthority =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'setAuthority',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"setOwner"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWriteZoomerMigratorSetOwner =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'setOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerMigratorAbi}__
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useSimulateZoomerMigrator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"migrate"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useSimulateZoomerMigratorMigrate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'migrate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"rescue"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useSimulateZoomerMigratorRescue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'rescue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"setAuthority"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useSimulateZoomerMigratorSetAuthority =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'setAuthority',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `functionName` set to `"setOwner"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useSimulateZoomerMigratorSetOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    functionName: 'setOwner',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerMigratorAbi}__
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWatchZoomerMigratorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `eventName` set to `"AuthorityUpdated"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWatchZoomerMigratorAuthorityUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    eventName: 'AuthorityUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerMigratorAbi}__ and `eventName` set to `"OwnerUpdated"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x3045597e25f8C57e32c08Fe5276c5Cf4AA4dD7f7)
 */
export const useWatchZoomerMigratorOwnerUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerMigratorAbi,
    address: zoomerMigratorAddress,
    eventName: 'OwnerUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useReadZoomerXerc20LockboxAll =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"ERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useReadZoomerXerc20LockboxAllErc20 =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'ERC20',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"IS_NATIVE"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useReadZoomerXerc20LockboxAllIsNative =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'IS_NATIVE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"XERC20"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useReadZoomerXerc20LockboxAllXerc20 =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'XERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWriteZoomerXerc20LockboxAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"deposit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWriteZoomerXerc20LockboxAllDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"depositNative"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWriteZoomerXerc20LockboxAllDepositNative =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'depositNative',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"depositNativeTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWriteZoomerXerc20LockboxAllDepositNativeTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'depositNativeTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"depositTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWriteZoomerXerc20LockboxAllDepositTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'depositTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWriteZoomerXerc20LockboxAllWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"withdrawTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWriteZoomerXerc20LockboxAllWithdrawTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'withdrawTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useSimulateZoomerXerc20LockboxAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"deposit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useSimulateZoomerXerc20LockboxAllDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"depositNative"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useSimulateZoomerXerc20LockboxAllDepositNative =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'depositNative',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"depositNativeTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useSimulateZoomerXerc20LockboxAllDepositNativeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'depositNativeTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"depositTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useSimulateZoomerXerc20LockboxAllDepositTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'depositTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useSimulateZoomerXerc20LockboxAllWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `functionName` set to `"withdrawTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useSimulateZoomerXerc20LockboxAllWithdrawTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    functionName: 'withdrawTo',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWatchZoomerXerc20LockboxAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `eventName` set to `"Deposit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWatchZoomerXerc20LockboxAllDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20LockboxAllAbi}__ and `eventName` set to `"Withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xB3bC2AaabB4C27890dBB491550eac3843A946625)
 */
export const useWatchZoomerXerc20LockboxAllWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20LockboxAllAbi,
    address: zoomerXerc20LockboxAllAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadZoomerXerc20LockboxBase =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"ERC20"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadZoomerXerc20LockboxBaseErc20 =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'ERC20',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"IS_NATIVE"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadZoomerXerc20LockboxBaseIsNative =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'IS_NATIVE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"OWNER"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadZoomerXerc20LockboxBaseOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'OWNER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"OpL1XERC20BRIDGE"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadZoomerXerc20LockboxBaseOpL1Xerc20Bridge =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'OpL1XERC20BRIDGE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"XERC20"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadZoomerXerc20LockboxBaseXerc20 =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'XERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteZoomerXerc20LockboxBase =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteZoomerXerc20LockboxBaseDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"depositAndBridgeToL2"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteZoomerXerc20LockboxBaseDepositAndBridgeToL2 =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'depositAndBridgeToL2',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteZoomerXerc20LockboxBaseInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"multicall"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteZoomerXerc20LockboxBaseMulticall =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"setOpL1XERC20Bridge"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteZoomerXerc20LockboxBaseSetOpL1Xerc20Bridge =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'setOpL1XERC20Bridge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteZoomerXerc20LockboxBaseWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateZoomerXerc20LockboxBase =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateZoomerXerc20LockboxBaseDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"depositAndBridgeToL2"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateZoomerXerc20LockboxBaseDepositAndBridgeToL2 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'depositAndBridgeToL2',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateZoomerXerc20LockboxBaseInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"multicall"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateZoomerXerc20LockboxBaseMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"setOpL1XERC20Bridge"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateZoomerXerc20LockboxBaseSetOpL1Xerc20Bridge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'setOpL1XERC20Bridge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateZoomerXerc20LockboxBaseWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchZoomerXerc20LockboxBaseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `eventName` set to `"Deposit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchZoomerXerc20LockboxBaseDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchZoomerXerc20LockboxBaseInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20LockboxBaseAbi}__ and `eventName` set to `"Withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBf16C4F1c3cff5E2C2CB2591456E891aad7FFC87)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchZoomerXerc20LockboxBaseWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20LockboxBaseAbi,
    address: zoomerXerc20LockboxBaseAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__
 */
export const useReadZoomerXerc20Old = /*#__PURE__*/ createUseReadContract({
  abi: zoomerXerc20OldAbi,
  address: zoomerXerc20OldAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadZoomerXerc20OldDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadZoomerXerc20OldAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadZoomerXerc20OldBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadZoomerXerc20OldDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"delay"`
 */
export const useReadZoomerXerc20OldDelay = /*#__PURE__*/ createUseReadContract({
  abi: zoomerXerc20OldAbi,
  address: zoomerXerc20OldAddress,
  functionName: 'delay',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadZoomerXerc20OldEip712Domain =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'eip712Domain',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"name"`
 */
export const useReadZoomerXerc20OldName = /*#__PURE__*/ createUseReadContract({
  abi: zoomerXerc20OldAbi,
  address: zoomerXerc20OldAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadZoomerXerc20OldNonces = /*#__PURE__*/ createUseReadContract(
  {
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'nonces',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"owner"`
 */
export const useReadZoomerXerc20OldOwner = /*#__PURE__*/ createUseReadContract({
  abi: zoomerXerc20OldAbi,
  address: zoomerXerc20OldAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"proposed"`
 */
export const useReadZoomerXerc20OldProposed =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'proposed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"proposedTimestamp"`
 */
export const useReadZoomerXerc20OldProposedTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'proposedTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"renounced"`
 */
export const useReadZoomerXerc20OldRenounced =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'renounced',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadZoomerXerc20OldSymbol = /*#__PURE__*/ createUseReadContract(
  {
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'symbol',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadZoomerXerc20OldTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__
 */
export const useWriteZoomerXerc20Old = /*#__PURE__*/ createUseWriteContract({
  abi: zoomerXerc20OldAbi,
  address: zoomerXerc20OldAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"acceptProposedOwner"`
 */
export const useWriteZoomerXerc20OldAcceptProposedOwner =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'acceptProposedOwner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"addBridge"`
 */
export const useWriteZoomerXerc20OldAddBridge =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'addBridge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteZoomerXerc20OldApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteZoomerXerc20OldBurn = /*#__PURE__*/ createUseWriteContract(
  {
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'burn',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteZoomerXerc20OldDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteZoomerXerc20OldIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteZoomerXerc20OldInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteZoomerXerc20OldMint = /*#__PURE__*/ createUseWriteContract(
  {
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'mint',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteZoomerXerc20OldPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"proposeNewOwner"`
 */
export const useWriteZoomerXerc20OldProposeNewOwner =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'proposeNewOwner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"removeBridge"`
 */
export const useWriteZoomerXerc20OldRemoveBridge =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'removeBridge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteZoomerXerc20OldRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteZoomerXerc20OldTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteZoomerXerc20OldTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__
 */
export const useSimulateZoomerXerc20Old =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"acceptProposedOwner"`
 */
export const useSimulateZoomerXerc20OldAcceptProposedOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'acceptProposedOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"addBridge"`
 */
export const useSimulateZoomerXerc20OldAddBridge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'addBridge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateZoomerXerc20OldApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateZoomerXerc20OldBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateZoomerXerc20OldDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateZoomerXerc20OldIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateZoomerXerc20OldInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateZoomerXerc20OldMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateZoomerXerc20OldPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"proposeNewOwner"`
 */
export const useSimulateZoomerXerc20OldProposeNewOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'proposeNewOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"removeBridge"`
 */
export const useSimulateZoomerXerc20OldRemoveBridge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'removeBridge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateZoomerXerc20OldRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateZoomerXerc20OldTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateZoomerXerc20OldTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__
 */
export const useWatchZoomerXerc20OldEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchZoomerXerc20OldApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `eventName` set to `"BridgeAdded"`
 */
export const useWatchZoomerXerc20OldBridgeAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    eventName: 'BridgeAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `eventName` set to `"BridgeRemoved"`
 */
export const useWatchZoomerXerc20OldBridgeRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    eventName: 'BridgeRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchZoomerXerc20OldEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    eventName: 'EIP712DomainChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchZoomerXerc20OldInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `eventName` set to `"OwnershipProposed"`
 */
export const useWatchZoomerXerc20OldOwnershipProposedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    eventName: 'OwnershipProposed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchZoomerXerc20OldOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zoomerXerc20OldAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchZoomerXerc20OldTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zoomerXerc20OldAbi,
    address: zoomerXerc20OldAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })
