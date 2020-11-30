export interface TokenInfo {
  token: {
    name: string;
    tokenAddress: string;
  };
}

export type ACTIONS = {
  type: "token:set";
  payload: TokenInfo;
};

export const tokenReducer = (state: TokenInfo, action: ACTIONS) => {
  switch (action.type) {
    case "token:set":
      return { ...state, token: action.payload.token };
    default:
      throw new Error();
  }
};
