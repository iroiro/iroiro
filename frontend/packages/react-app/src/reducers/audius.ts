export type AUDIUS_ACTIONS =
  | {
      type: "email:set";
      payload: { email: string };
    }
  | { type: "password:set"; payload: { password: string } }
  | { type: "audius:login" };

export interface AudiusState {
  email: string;
  password: string;
  followers: string[];
  isSignin: boolean;
  requestSignin: boolean;
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
    case "audius:login": {
      return { ...state, requestSignin: true };
    }
    default:
      throw new Error();
  }
};

export const audiusInitialState: AudiusState = {
  email: "",
  password: "",
  followers: [],
  isSignin: false,
  requestSignin: false,
};
