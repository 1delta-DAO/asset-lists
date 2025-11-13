/** wrapped assets to overarching group */
const GROUP_TO_GROUP_MAPPER: Record<string, string> = {
  // wnatives
  WBNB: 'BNB',
  WETH: 'ETH',
  WPOL: 'POL',
  WPLUME: 'PLUME',
  WSOPH: 'SOPH',
  // maps the polygon migration
  MATIC: 'POL',
  WMATIC: 'POL',
  WMETIS: 'METIS',
  WCORE: 'CORE',
  WMNT: 'MNT',
  WFTN: 'FTN',
  WXDAI: 'XDAI',
  WAVAX: 'AVAX',
  WGLMR: 'GLMR',
  WAZERO: 'AZERO',
  WBERA: 'BERA',
  WBTCN: 'BTCN',
  WTLOS: 'TLOS',
  WFUSE: 'FUSE',
  WFTM: 'FTM',
  WEDU: 'EDU',
  WFIL: 'FIL',
  WIOTX: 'IOTX',
  WPALM: 'PALM',
  WNEON: 'NEON',
  WWINR: 'WINR',
  WXAI: 'XAI',
  WONE: 'ONE',
  WISLM: 'ISLM',
  WKAIA: 'KAIA',
  WSHM: 'SHM',
  WBTT: 'BTT',
  WZETA: 'ZETA',
  WXODEX: 'XODEX',
  WKAVA: 'KAVA',
  WDMT: 'DMT',
  WSEI: 'SEI',
  WMOVR: 'MOVR',
  WIP: 'IP',
  WDOGE: 'DOGE',
  WG: 'G',
  WS: 'S',
  WAPE: 'APE',
  WROSE: 'ROSE',
  WXTZ: 'XTZ',
  WDEGEN: 'DEGEN',
  WASTR: 'ASTR',
  WHYPE: 'HYPE',
  WXPL: 'XPL',
  // kelp dao ETH wrapper
  WRSETH: 'RSETH',
  // USDT l0
  USDT0: 'USDT',
  // solvbtcs
  'SolvBTC.b': 'SolvBTC',
  'SolvBTC.m': 'SolvBTC',
  // merlin ones
  'M-USDT': 'USDT',
  'M-USDC': 'USDC',
  // vault bridge ones
  vbUSDT: 'USDT',
  vbUSDC: 'USDC',
  // Thunder Core uSDC
  'TT-USDC': 'USDC',
  'TT-USDT': 'USDT',
  'Wrapped BTC::TT-WBTC': 'WBTC',
}

export function mapAssetGroup(gr: string) {
  return GROUP_TO_GROUP_MAPPER[gr] ?? gr
}
