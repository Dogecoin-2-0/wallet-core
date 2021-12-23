import { Wallet } from "ethers";
import Web3 from "web3";
import * as constants from "../../constants";

const web3 = new Web3();

export default class SmartChain {
  static generateWalletFromMnemonic(mnemonic) {
    const walletFromMnemonic = Wallet.fromMnemonic(mnemonic);
    return { address: walletFromMnemonic.address, pk: walletFromMnemonic.privateKey };
  }

  static generateWalletFromPrivateKey(pk) {
    const accountFromPrivateKey = web3.eth.accounts.privateKeyToAccount(pk);
    return { address: accountFromPrivateKey.address, pk: accountFromPrivateKey.privateKey };
  }

  static async fetchInfo() {
    const infoResponse = await fetch(`${constants.ASSETS_ROOT}/assets/binance/info`, { method: "GET" });
    const infoResponseJson = await infoResponse.json();
    if (infoResponse.status >= 400) throw new Error(infoResponseJson.error);
    return { ...infoResponseJson.result, image: `${constants.ASSETS_ROOT}/assets/binance/image` };
  }
}
