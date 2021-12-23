import { utils } from "ethers";

export const generateFromMnemonic = argMnemonic => {
  let mnemonic;

  if (argMnemonic || argMnemonic !== null || typeof argMnemonic !== "undefined") mnemonic = argMnemonic;
  else mnemonic = utils.entropyToMnemonic(utils.randomBytes(16));

  return mnemonic;
};
