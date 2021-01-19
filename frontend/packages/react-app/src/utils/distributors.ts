import { Distributor } from "../interfaces";

const distributors: Distributor[] = [
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
  },
  {
    id: "0x471eb08f9ee41179205e83a373b9a9d3512059a8",
    distributorCid: "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA",
    distributorMetadata: {
      name: "Wallet Address Distributor",
      description: "",
      image: "https://example.com/distributorimage.jpg",
    },
    type: "wallet",
    version: "",
  },
];

export default distributors;
