import { Wallet } from "ethers";
import Web3 from "web3";
import { generateFromMnemonic } from "../../utils";
import * as constants from "../../constants";

export default class SmartChain {
  static generateWallet(mnemonic = null) {
    const walletFromMnemonic = Wallet.fromMnemonic(generateFromMnemonic(mnemonic));
    return { address: walletFromMnemonic.address, pk: walletFromMnemonic.privateKey };
  }

  static async fetchInfo() {
    const infoResponse = await fetch(`${constants.ASSETS_ROOT}/assets/binance/info`, { method: "GET" });
    const infoResponseJson = await infoResponse.json();
    if (infoResponse.status >= 400) throw new Error(infoResponseJson.error);
    return { ...infoResponseJson.result, image: `${constants.ASSETS_ROOT}/assets/binance/image` };
  }
}
