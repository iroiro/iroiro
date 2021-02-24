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

import { Distributor } from "../interfaces";
import MenuButton from "../components/atoms/MenuButton";
import React from "react";

// ID must be lowercase
const distributors: Distributor[] = [
  {
    id: "0xa79c1B3e529c34bA3B7373d95119B16b0714E155",
    distributorCid: "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA",
    distributorMetadata: {
      name: "Wallet Address Distributor",
      description: "To distribute tokens to a list of addresses that you have.",
      image: "https://example.com/distributorimage.jpg",
    },
    type: "wallet",
    version: "",
    disabled: false,
  },
  {
    id: "0x8b5abD70339787DF920C982a46fF6066EB13Ab68",
    distributorCid: "Qma51KJaSdehSWv7JZUzyib7U2pz6JttUNA2wTETn3dbCY",
    distributorMetadata: {
      name: "URL Distributor",
      description: "To distribute tokens with a unique URL per user.",
      image: "https://example.com/distributorimage.jpg",
    },
    type: "uuid",
    version: "",
    disabled: false,
  },
  {
    id: "0x8b5abD70339787DF920C982a46fF6066EB13Ab68",
    distributorCid: "Qma51KJaSdehSWv7JZUzyib7U2pz6JttUNA2wTETn3dbCY",
    distributorMetadata: {
      name: "Email Distributor",
      description:
        "To distribute tokens to a list of Email addresses that you have.",
      image: "https://example.com/distributorimage.jpg",
    },
    type: "email",
    version: "",
    disabled: false,
  },
  {
    id: "0x590b4465a94be635bf2f760025c61ec3680f687c",
    distributorCid: "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA",
    distributorMetadata: {
      name: "Audius Followers Distributor",
      description:
        "This distributor enables creators to distributes tokens for their followers on Auduis.",
      image: "https://example.com/distributorimage.jpg",
    },
    type: "audius",
    version: "",
    disabled: true,
  },
].map((dist) => {
  return {
    ...dist,
    id: dist.id.toLowerCase(),
  };
});

export default distributors;
