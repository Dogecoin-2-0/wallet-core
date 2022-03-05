export const assetPriceKeyMap = {
  binance: 'binancecoin',
  avalanche: 'avalanche-2',
  ethereum: 'ethereum',
  polygon: 'matic-network'
};

export const assetProvidersMap = {
  avalanche: 'https://speedy-nodes-nyc.moralis.io/558120230227a848a2bb7043/avalanche/testnet',
  binance: 'https://speedy-nodes-nyc.moralis.io/558120230227a848a2bb7043/bsc/testnet',
  ethereum: 'https://speedy-nodes-nyc.moralis.io/558120230227a848a2bb7043/eth/ropsten',
  polygon: 'https://speedy-nodes-nyc.moralis.io/558120230227a848a2bb7043/polygon/mumbai'
};

export const assetTxChainMap = {
  binance: 'smartchain',
  avalanche: 'avalanche',
  ethereum: 'ethereum',
  polygon: 'polygon'
};

export const chainIdMap = {
  binance: 97,
  ethereum: 3,
  avalanche: 43113,
  polygon: 80001
};

export const gasOraclesMap = {
  binance: 'https://api.bscscan.com/api?module=gastracker&action=gasoracle',
  ethereum: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=9VIBB7Y17AR7Z7A2YBTMYG67S91XC7MKHY',
  polygon: 'https://api.polygonscan.com/api?module=gastracker&action=gasoracle',
  avalanche: 'https://api.bscscan.com/api?module=gastracker&action=gasoracle'
};
