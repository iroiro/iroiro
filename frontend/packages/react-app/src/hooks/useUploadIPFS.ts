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

import { useCallback } from "react";
import useAxios from "axios-hooks";
import { IPFS_PINNING_API } from "../utils/const";
import IpfsHttpClient from "ipfs-http-client";

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

type PinFileType = "json" | "file";

export const useUploadIPFS = (): {
  uploadIpfs: (rawData: any, type: PinFileType) => Promise<string>;
} => {
  const [_, postPinning] = useAxios(
    {
      url: IPFS_PINNING_API,
      method: "POST",
    },
    { manual: true }
  );

  const uploadIpfs = useCallback(
    async (rawData: any, type: PinFileType): Promise<string> => {
      const data = type === "json" ? JSON.stringify(rawData) : rawData;
      const { path } = await ipfs.add(data);
      await postPinning({ data: { hashToPin: path } });
      return path;
    },
    []
  );

  return { uploadIpfs };
};
