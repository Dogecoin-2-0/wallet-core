import { utils } from "ethers";

export const generateFromMnemonic = argMnemonic => {
  let mnemonic;

  if (argMnemonic) mnemonic = argMnemonic;
  else mnemonic = utils.entropyToMnemonic(utils.randomBytes(16));

  return Promise.resolve(mnemonic);
};
