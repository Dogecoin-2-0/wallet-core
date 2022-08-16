export const assetProvidersMap = {
  avalanche: 'https://api.avax-test.network/ext/bc/C/rpc',
  binance: 'https://bsctestapi.terminet.io/rpc',
  ethereum: 'https://rpc.ankr.com/eth_ropsten',
  polygon: 'https://matic-mumbai.chainstacklabs.com'
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

export const transactionProxyContractsMap = {
  binance: '0x25072e9d140B184cd801aB7B97590e2205F643cb',
  avalanche: '0x2A631765beBF4131471Ff02DE98203A1D48F2ba3',
  polygon: '0xD8b7e53036d9e454b2D350C2Fb6c7a3d7923b390',
  ethereum: '0x33888922465aE600E9Db751D90B74d220072B242'
};

export const timelockedSmartContractsMap = {
  binance: '0x6278a3564d748e4c7308c5e3a69301eb7c26d3b4',
  avalanche: '0x9CdC35e63C79c0e83f656929aD52CC9fc02EA3B4',
  polygon: '0x7Ff2dc014305A0E0bb629b7C7ac96bA7eA5332b3',
  ethereum: '0x122Ee522cD0aC0bc6c67e8C99b6153D6c898dafd'
};
