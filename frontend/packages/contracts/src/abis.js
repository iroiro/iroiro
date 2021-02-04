/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import tokenFactoryAbi from "./abis/TokenFactory.json";
import fanTokenAbi from "./abis/FanToken.json";
import stakingAbi from "./abis/Staking.json";
import vestingAbi from "./abis/Vesting.json";
import audiusAbi from "./abis/Audius.json";
import audiusDistributorAbi from "./abis/AudiusDistributor.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  tokenFactory: tokenFactoryAbi,
  fanToken: fanTokenAbi,
  staking: stakingAbi,
  vesting: vestingAbi,
  audius: audiusAbi,
  audiusDistributor: audiusDistributorAbi,
};

export default abis;
