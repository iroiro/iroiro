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

const WalletNFTDistributor = artifacts.require("WalletNFTDistributor");

const distributorInfoCid = "QmXKRJGq5iR7Km5Pz7yEtj8nHesuSFZo2omfWxXVCF3pJU";

module.exports = async (deployer) => {
  await deployer.deploy(
    WalletNFTDistributor,
    distributorInfoCid,
    "https://example.com/{id}" // TODO update
  );
};
