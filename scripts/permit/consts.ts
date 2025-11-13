import { Address, keccak256, parseAbi } from 'viem'


// keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")
export const EIP712_DOMAIN_TYPEHASH: `0x${string}` =
  '0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f'

export const hashedVersion1 = keccak256(new TextEncoder().encode('1'))
export const hashedVersion2 = keccak256(new TextEncoder().encode('2'))

// https://eips.ethereum.org/EIPS/eip-1967
export const PROXY_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'
export const BEACON_SLOT = '0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50'

export const CHUNK_SIZE = 50

export interface Token {
  chainId: string
  decimals: number
  name: string
  address: Address
  symbol: string
}

export interface TokenListFile {
  list: Record<string, Token>
}

export type PermitType = 'EIP2612' | 'DAI'

export interface TokenWithPermits {
  token: Token
  type: PermitType
  version: `1` | `2` | undefined
  /** The name of the token as read from the contract */
  name: string
  domainSeparator: string
  implementation?: Address
  beacon?: Address
}

export const EIP2612_PERMIT_ABI = parseAbi([
  'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external',
  'function allowance(address,address) view returns (uint256)',
])

export const DAI_PERMIT_ABI = parseAbi([
  'function permit(address holder, address spender, uint256 nonce, uint256 expiry, bool allowed, uint8 v, bytes32 r, bytes32 s) external',
  'function allowance(address,address) view returns (uint256)',
])
