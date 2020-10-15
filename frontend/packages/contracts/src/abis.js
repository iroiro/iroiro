import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import tokenFactoryAbi from "./abis/TokenFactory.json";
import fanTokenAbi from "./abis/FanToken.json";
import stakingAbi from "./abis/Staking.json"
import vestingAbi from "./abis/Vesting.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  tokenFactory: tokenFactoryAbi,
  fanToken: fanTokenAbi,
  staking: stakingAbi,
  vesting: vestingAbi,
};

export default abis;
