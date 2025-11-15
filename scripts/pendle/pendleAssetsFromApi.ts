import { Chain } from '@1delta/chain-registry'
import { fetchAllAssetsData, fetchAllMarketsData, PendleMarketMapping } from './pendleUtils'

interface Token {
  chainId: string
  name: string
  symbol: string
  address: string
  decimals: number
  logoURI?: string
  tags?: string[]
  props?: any
}

interface PendleAssetList {
  [chainId: string]: { [address: string]: Token }
}

/**
 * Fetch pendle assets and markets data from pendle api and process them
 */
export async function processPendleAssets(): Promise<PendleAssetList> {
  console.log('Processing Pendle assets from API...')

  const chains = await fetch('https://raw.githubusercontent.com/1delta-DAO/chains/main/data.json').then((x) => x.json())

  const [assetsData, marketsData] = await Promise.all([fetchAllAssetsData(), fetchAllMarketsData()])

  const assetList: PendleAssetList = {}
  const marketsByChain = marketsData

  const ptToMarketMap: { [chainId: string]: { [ptAddress: string]: PendleMarketMapping } } = {}
  const ytToMarketMap: { [chainId: string]: { [ytAddress: string]: PendleMarketMapping } } = {}
  const syToMarketMap: { [chainId: string]: { [syAddress: string]: PendleMarketMapping } } = {}

  Object.entries(marketsByChain).forEach(([chainId, markets]: [string, any]) => {
    ptToMarketMap[chainId] = {}
    ytToMarketMap[chainId] = {}
    syToMarketMap[chainId] = {}

    markets.forEach((market) => {
      const expiryTimestamp = market.expiry ? Math.floor(new Date(market.expiry).getTime() / 1000) : undefined
      const marketData: PendleMarketMapping = {
        marketAddress: market.address.toLowerCase(),
        syAddress: market.sy?.split('-')[1]?.toLowerCase(),
        expiry: expiryTimestamp,
        ytAddress: market.yt?.split('-')[1]?.toLowerCase(),
        ptAddress: market.pt,
        underlyingAsset: market.underlyingAsset?.split('-')[1]?.toLowerCase(),
        name: market.name,
        isNew: market.isNew,
        isPrime: market.isPrime,
        categoryIds: market.categoryIds,
        details: market.details,
      }

      if (market.pt) {
        const ptAddress = market.pt.split('-')[1]?.toLowerCase()
        if (ptAddress) {
          ptToMarketMap[chainId][ptAddress] = marketData
        }
      }

      if (market.yt) {
        const ytAddress = market.yt.split('-')[1]?.toLowerCase()
        if (ytAddress) {
          ytToMarketMap[chainId][ytAddress] = marketData
        }
      }

      if (market.sy) {
        const syAddress = market.sy.split('-')[1]?.toLowerCase()
        if (syAddress) {
          syToMarketMap[chainId][syAddress] = marketData
        }
      }
    })
  })

  for (const [chainId, assets] of Object.entries(assetsData)) {
    if (!Object.values(Chain).includes(chainId as Chain)) {
      continue
    }
    // @ts-ignore
    for (const asset of assets) {
      if (!assetList[chainId]) {
        assetList[chainId] = {}
      }

      const address = asset.address.toLowerCase()
      const isPT = asset.tags.includes('PT')
      const isYT = asset.tags.includes('YT')
      const isSY = asset.tags.includes('SY')
      const isLPT = asset.tags.includes('PENDLE_LP')

      if (isLPT) {
        continue
      }

      const tokenEntry: Token = {
        chainId,
        name: asset.name + ' ' + chains[chainId].name.split(' ')[0],
        symbol: asset.symbol,
        address,
        decimals: asset.decimals,
        logoURI: asset.proIcon,
        tags: [...asset.tags],
      }

      const pendleProps: any = {
        tokenType: isPT ? 'PT' : isYT ? 'YT' : isSY ? 'SY' : undefined,
      }

      let marketData: PendleMarketMapping | undefined

      if (isPT) {
        marketData = ptToMarketMap[chainId]?.[address]
      } else if (isYT) {
        marketData = ytToMarketMap[chainId]?.[address]
      } else if (isSY) {
        marketData = syToMarketMap[chainId]?.[address]
      }

      if (marketData) {
        pendleProps.marketAddress = marketData.marketAddress
        pendleProps.expiry = marketData.expiry
        pendleProps.underlyingAsset = marketData.underlyingAsset

        if (isPT) {
          pendleProps.ytAddress = marketData.ytAddress
          pendleProps.syAddress = marketData.syAddress
        } else if (isYT) {
          pendleProps.ptAddress = marketData.ptAddress.split('-')[1]?.toLowerCase()
          pendleProps.syAddress = marketData.syAddress
        } else if (isSY) {
          pendleProps.ptAddress = marketData.ptAddress.split('-')[1]?.toLowerCase()
          pendleProps.ytAddress = marketData.ytAddress
        }
      }

      if (asset.expiry) {
        const expiryDate = new Date(asset.expiry)
        const now = new Date()
        const isExpired = expiryDate < now

        if (isExpired) {
          pendleProps.expired = true
        }
      }

      if (Object.keys(pendleProps).length > 0) {
        tokenEntry.props = { pendle: pendleProps }
      }

      assetList[chainId][address] = tokenEntry
    }
  }

  const totalAssets = Object.values(assetList).reduce((sum, chain) => sum + Object.keys(chain).length, 0)
  console.log(`Processed ${totalAssets} Pendle assets across ${Object.keys(assetList).length} chains`)

  return assetList
}

export function convertPendleAssetsToTokenMap(pendleAssets: PendleAssetList): {
  [chainId: string]: { [address: string]: any }
} {
  const result: { [chainId: string]: { [address: string]: any } } = {}

  Object.entries(pendleAssets).forEach(([chainId, assets]) => {
    result[chainId] = {}

    Object.entries(assets).forEach(([address, asset]) => {
      result[chainId][address] = {
        chainId: asset.chainId,
        name: asset.name,
        symbol: asset.symbol,
        address: asset.address,
        decimals: asset.decimals,
        logoURI: asset.logoURI,
        tags: asset.tags,
        props: asset.props,
      }
    })
  })

  return result
}
