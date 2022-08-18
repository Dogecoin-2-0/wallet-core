export const assetProvidersMap = {
  avalanche: 'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc',
  binance: 'https://bsc-dataseed2.defibit.io',
  ethereum: 'https://eth-mainnet.public.blastapi.io',
  polygon: 'https://rpc.ankr.com/polygon'
};

export const assetTxChainMap = {
  binance: 'smartchain',
  avalanche: 'avalanche',
  ethereum: 'ethereum',
  polygon: 'polygon'
};

export const chainIdMap = {
  binance: 56,
  ethereum: 1,
  avalanche: 43114,
  polygon: 137
};

export const gasOraclesMap = {
  binance: 'https://api.bscscan.com/api?module=gastracker&action=gasoracle',
  ethereum: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=9VIBB7Y17AR7Z7A2YBTMYG67S91XC7MKHY',
  polygon: 'https://api.polygonscan.com/api?module=gastracker&action=gasoracle',
  avalanche: 'https://api.bscscan.com/api?module=gastracker&action=gasoracle'
};

export const transactionProxyContractsMap = {
  binance: '0x24e414318aBd7FA5407c7372a60f238fD65B9AF4',
  avalanche: '0x6269b4705FCdBAbF81D4636e33c2100f757A05ac',
  polygon: '0xfbAE861cbDFBB11AC0bC64c27AE7fEd3f99B8737',
  ethereum: '0x6269b4705FCdBAbF81D4636e33c2100f757A05ac'
};

export const timelockedSmartContractsMap = {
  binance: '0x1853acb5d771cBfAd3db55C65385F03F2471d9aC',
  avalanche: '0x7cA0Af2CBdD6bBBf288b47BdD8ef834A39588074',
  polygon: '0x18e3aaa26d0472DC9136C88524437861B72671Dd',
  ethereum: '0x7cA0Af2CBdD6bBBf288b47BdD8ef834A39588074'
};
