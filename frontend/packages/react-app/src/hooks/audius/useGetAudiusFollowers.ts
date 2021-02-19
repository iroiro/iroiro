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

import { useEffect, useState } from "react";
import { Target } from "../../interfaces";

export const useGetAudiusFollowers = (
  libs: any,
  user: any
): {
  followersCount: number;
  followers: any[];
  progress: number;
  isLoading: boolean;
} => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const f = async () => {
      if (libs.User === undefined || user === null) {
        return;
      }
      setFollowersCount(user.follower_count);
      setIsLoading(true);
      let allFollowers: Target[] = [];
      const offset = 100;
      for (let i = 0; i <= user.follower_count / offset; i++) {
        const targets = await libs.User.getFollowersForUser(
          offset,
          i * offset,
          user.user_id
        );
        const followers: Target[] = targets.map((target: Target) => {
          return {
            handle: target.handle,
            wallet: target.wallet.toLowerCase(),
          };
        });
        allFollowers = allFollowers.concat(followers);
        setProgress((i * offset) / user.follower_count);
      }

      const followers = await libs.User.getFollowersForUser(
        100,
        0,
        user.user_id
      );
      setIsLoading(false);
      setFollowers(followers);
    };
    f();
  }, [libs, user]);

  return {
    followersCount,
    followers,
    progress,
    isLoading,
  };
};