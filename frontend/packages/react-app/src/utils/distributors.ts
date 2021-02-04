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

const distributors: Distributor[] = [
  {
    id: "0xb562cf605a0f8a123bf7abfdfe1317671a8b5ead",
    distributorCid: "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA",
    distributorMetadata: {
      name: "Wallet Address Distributor",
      description: "",
      image: "https://example.com/distributorimage.jpg",
    },
    type: "wallet",
    version: "",
    disabled: false,
  },
  {
    id: "0x360557300E0B373bDb451f07fA292320CC4df136",
    distributorCid: "QmRBHkjbuLExQPia1wiLgwjqXaBXowPDVVPPoTJv9wJnYP",
    distributorMetadata: {
      name: "URL Distributor",
      description: "",
      image: "https://example.com/distributorimage.jpg",
    },
    type: "uuid",
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
