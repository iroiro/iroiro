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

export const useGetAudiusUserOrSignIn = (
  libs: any,
  email: string,
  password: string,
  requestSignin: boolean
): any | null => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (libs === undefined || libs.Account === undefined) {
      return;
    }
    const f = async () => {
      const user = await libs.Account.getCurrentUser();
      setUser(user);
    };
    f();
  }, [libs]);

  useEffect(() => {
    if (libs === undefined || email === "" || password === "") {
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
