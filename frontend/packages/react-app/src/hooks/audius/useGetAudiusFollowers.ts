import { useEffect, useState } from "react";

export const useGetAudiusFollowers = (
  libs: any,
  user: any
): {
  followers: any[];
  isLoading: boolean;
} => {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const f = async () => {
      if (libs.User === undefined || user === null) {
        return;
      }
      setIsLoading(true);
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
    followers,
    isLoading,
  };
};
