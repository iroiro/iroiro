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

// This address points to a contract deployed on Ethereum Mainnet,
// Goerli, Kovan, Rinkeby and Ropsten. Replace it with your smart contracts.
const addresses = {
  WalletDistributor: process.env.REACT_APP_CONTRACT_WALLETDISTRIBUTOR,
  UUIDDistributor: process.env.REACT_APP_CONTRACT_UUIDDISTRIBUTOR,
  WalletNFTDistributor: process.env.REACT_APP_CONTRACT_WALLETNFTDISTRIBUTOR,
  UUIDNFTDistributor: process.env.REACT_APP_CONTRACT_UUIDNFTDISTRIBUTOR,
};

export default addresses;
