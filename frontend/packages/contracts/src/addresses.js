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

// This address points to a dummy ERC20 contract deployed on Ethereum Mainnet,
// Goerli, Kovan, Rinkeby and Ropsten. Replace it with your smart contracts.
const addresses = {
  Migrations: "0x3da835E1c3778B40a256E260D2A4fd31b676f2eb",
  TokenFactory: "0x12E9153D1e8036C4F197F3Edf4f73707d3c77E98",
  Staking: "0x09F303C3Bd47161Ea735d49491b42076f8DA8E28",
  Vesting: "0x886D4Aa23a93FeB8252B47e2BA9Fab7C078Faebe",
  Audius: "0x4273503fc36E02004C6FEb242253046Bc2d59870",
  Oracle: "0x80041A05d87a9355e154460c6Aba3dB589F44793",
  CCTWalletDistributor: "0x590b4465a94bE635bF2F760025c61Ec3680f687C",
  WalletDistributor: "0xb562cf605a0f8a123bf7abfdfe1317671a8b5ead",
  UUIDDistributor: "0x360557300e0b373bdb451f07fa292320cc4df136",
};

export default addresses;
