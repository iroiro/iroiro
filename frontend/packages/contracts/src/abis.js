import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import tokenFactoryAbi from "./abis/TokenFactory.json";
import fanTokenAbi from "./abis/FanToken.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  tokenFactory: tokenFactoryAbi,
  fanToken: fanTokenAbi,
};

export default abis;
