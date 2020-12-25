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
    }
  | {
      type: "isRequestSignout:set";
      payload: { isRequestSignout: boolean };
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
  isRequestSignout: boolean;
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
      const newOffset = state.offset + 100;
      return {
        ...state,
        followers: newFollowers,
        offset: newOffset,
        isRequestFollowers: false,
      };
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
    case "isRequestSignout:set": {
      return {
        ...state,
        isRequestFollowers: action.payload.isRequestSignout,
      };
    }
    default:
      throw new Error();
  }
};

export const audiusInitialState: AudiusState = {
  email: "",
  password: "",
  followers: [],
  followersCount: 0,
  isSignin: false,
  requestSignin: false,
  isLibsActive: false,
  offset: 0,
  isRequestFollowers: false,
  isRequestSignout: false,
};
