import { Chain } from '@1delta/chain-registry'

export const PRESET_SYMBOLS: { [ch: string | number]: string[] } = {
  [Chain.TAIKO_ALETHIA]: ['TAIKO'],
  [Chain.GNOSIS]: ['GNO', 'COW'],
  [Chain.HEMI_NETWORK]: ['HEMIBTC', 'USDC.E'],
  [Chain.SONIC_MAINNET]: ['USDC.E', 'AXLETH', 'AXLUSDT', 'SOLVBTC'],
  [Chain.CORE_BLOCKCHAIN_MAINNET]: ['SOLVBTC.M', 'SOLVBTC.CORE'],
  [Chain.METIS_ANDROMEDA_MAINNET]: ['ARTMETIS', 'M.USDT'],
  [Chain.POLYGON_MAINNET]: ['HEMIBTC'],
  [Chain.MANTLE]: ['FBTC', 'METH', 'USDE'],
  [Chain.ARBITRUM_ONE]: ['ARB', 'USDE', 'EZETH'],
  [Chain.OP_MAINNET]: ['OP', 'SNX'],
  [Chain.BASE]: ['USDBC'],
  [Chain.MODE]: ['UNIBTC', 'SOLVBTC'],
  [Chain.FUEL]: ['FUEL', 'EZETH', 'PZETH'],
  [Chain.SCROLL]: ['SCR'],
  [Chain.KATANA]: ['VBETH', 'VBWBTC', 'VBUSDC', 'VBUSDT'],
}
