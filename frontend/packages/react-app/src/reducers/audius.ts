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

import { Target } from "../interfaces";

export type AUDIUS_ACTIONS =
  | {
      type: "libs:set";
      payload: { libs: any };
    }
  | {
      type: "user:set";
      payload: { user: any };
    }
  | {
      type: "email:set";
      payload: { email: string };
    }
  | { type: "password:set"; payload: { password: string } }
  | { type: "followers:set"; payload: { followers: Target[] } }
  | { type: "followersCount:set"; payload: { followersCount: number } }
  | { type: "audius:login" }
  | { type: "audius:loggedIn" }
  | { type: "offset:set" }
  | {
      type: "isRequestFollowers:set";
      payload: { isRequestFollowers: boolean };
    }
  | {
      type: "isRequestSignout:set";
      payload: { isRequestSignout: boolean };
    }
  | {
      type: "progress:set";
      payload: { progress: number };
    }
  | { type: "state:reset" };

export interface AudiusState {
  libs?: any;
  user?: any;
  email: string;
  password: string;
  followers: Target[];
  followersCount: number;
  isSignin: boolean;
  requestSignin: boolean;
  isRequestFollowers: boolean;
  isRequestSignout: boolean;
  progress: number;
}

export const audiusReducer = (
  state: AudiusState,
  action: AUDIUS_ACTIONS
): AudiusState => {
  switch (action.type) {
    case "libs:set": {
      return {
        ...state,
        libs: action.payload.libs,
      };
    }
    case "user:set": {
      return { ...state, user: action.payload.user };
    }
    case "email:set": {
      return { ...state, email: action.payload.email };
    }
    case "password:set": {
      return { ...state, password: action.payload.password };
    }
    case "followers:set": {
      const followers: Target[] = action.payload.followers.map((follower) => {
        return {
          handle: follower.handle,
          wallet: follower.wallet,
        };
      });
      return {
        ...state,
        followers: followers,
        isRequestFollowers: false,
      };
    }
    case "progress:set": {
      return { ...state, progress: action.payload.progress };
    }
    case "followersCount:set": {
      return { ...state, followersCount: action.payload.followersCount };
    }
    case "audius:login": {
      return { ...state, requestSignin: true };
    }
    case "audius:loggedIn": {
      return { ...state, isSignin: true, requestSignin: false };
    }
    case "isRequestFollowers:set": {
      return {
        ...state,
        isRequestFollowers: action.payload.isRequestFollowers,
      };
    }
    case "isRequestSignout:set": {
      return {
        ...state,
        isRequestSignout: action.payload.isRequestSignout,
      };
    }
    case "state:reset": {
      return {
        ...audiusInitialState,
        libs: state.libs,
      };
    }
    default:
      throw new Error();
  }
};

export const audiusInitialState: AudiusState = {
  libs: undefined,
  user: null,
  email: "",
  password: "",
  followers: [],
  followersCount: 0,
  isSignin: false,
  requestSignin: false,
  isRequestFollowers: false,
  isRequestSignout: false,
  progress: 0,
};
