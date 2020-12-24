import { Target } from "../interfaces";

export type AUDIUS_ACTIONS =
  | {
      type: "email:set";
      payload: { email: string };
    }
  | { type: "password:set"; payload: { password: string } }
  | { type: "followers:set"; payload: { followers: any[] } }
  | { type: "followersCount:set"; payload: { followersCount: number } }
  | { type: "audius:login" }
  | { type: "audius:loggedIn" }
  | { type: "isLibsActive:true" }
  | { type: "offset:set" }
  | {
      type: "isRequestFollowers:set";
      payload: { isRequestFollowers: boolean };
    };

export interface AudiusState {
  email: string;
  password: string;
  followers: Target[];
  followersCount: number;
  isSignin: boolean;
  requestSignin: boolean;
  isLibsActive: boolean;
  offset: number;
  isRequestFollowers: boolean;
}

export const audiusReducer = (
  state: AudiusState,
  action: AUDIUS_ACTIONS
): AudiusState => {
  switch (action.type) {
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
      const newFollowers = state.followers.concat(followers);
      const nextOffset = state.offset + 1;
      return { ...state, followers: newFollowers, offset: nextOffset };
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
    case "isLibsActive:true": {
      return { ...state, isLibsActive: true };
    }
    case "isRequestFollowers:set": {
      return {
        ...state,
        isRequestFollowers: action.payload.isRequestFollowers,
      };
    }
    default:
      throw new Error();
  }
};

export const audiusInitialState: AudiusState = {
  email: "",
  password: "",
  followers: [
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
    {
      handle: "handlename",
      wallet: "0x0000000000000000000000000000000000000000",
    },
  ],
  followersCount: 0,
  isSignin: false,
  requestSignin: false,
  isLibsActive: false,
  offset: 0,
  isRequestFollowers: false,
};
