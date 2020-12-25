import { useEffect, useState } from "react";

export const useGetAudiusUserOrSignIn = (
  libs: any,
  email: string,
  password: string,
  requestSignin: boolean
): any | null => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (libs.Account === undefined) {
      return;
    }
    const f = async () => {
      const user = await libs.Account.getCurrentUser();
      setUser(user);
    };
    f();
  }, [libs]);

  useEffect(() => {
    if (libs.Account === undefined || email === "" || password === "") {
      return;
    }
    if (!requestSignin) {
      return;
    }
    const f = async () => {
      const { user } = await libs.Account.login(email, password);
      setUser(user);
    };
    f();
  }, [libs, email, password, requestSignin]);

  return user;
};
