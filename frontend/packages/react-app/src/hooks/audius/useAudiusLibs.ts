import { useEffect, useState } from "react";
// @ts-ignore
import Audius from "@audius/libs";

export const useAudiusLibs = (): { libs: any; isLibsInitialized: boolean } => {
  const [libs, setLibs] = useState(Object);
  const [isLibsInitialized, setIsLibsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const dataRegistryAddress = "0xC611C82150b56E6e4Ec5973AcAbA8835Dd0d75A2";

      const ethTokenAddress = "0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998";
      const ethRegistryAddress = "0xd976d3b4f4e22a238c1A736b6612D22f17b6f64C";
      const ethProviderUrl =
        "https://mainnet.infura.io/v3/d6b566d7eea1408988388c311d5a273a";
      const ethProviderOwnerWallet =
        "0xC7310a03e930DD659E15305ed7e1F5Df0F0426C5";

      const libs = new Audius({
        web3Config: Audius.configInternalWeb3(dataRegistryAddress, [
          "https://core.poa.network",
        ]),

        ethWeb3Config: Audius.configEthWeb3(
          ethTokenAddress,
          ethRegistryAddress,
          ethProviderUrl,
          ethProviderOwnerWallet
        ),

        discoveryProviderConfig: Audius.configDiscoveryProvider(),
        identityServiceConfig: Audius.configIdentityService(
          "https://identityservice.audius.co"
        ),
        creatorNodeConfig: Audius.configCreatorNode(
          "https://creatornode.audius.co"
        ),
      });
      await libs.init();
      setLibs(libs);
      setIsLibsInitialized(true);
    };
    init();
  }, []);

  return { libs, isLibsInitialized };
};
