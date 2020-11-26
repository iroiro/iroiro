export interface TokenInfo {
  token: {
    name: string;
    tokenAddress: string;
  };
}

export type ACTIONS = {
  type: "token";
  payload: TokenInfo;
};

export const tokenReducer = (state: TokenInfo, action: ACTIONS) => {
  switch (action.type) {
    case "token":
      return { ...state, token: action.payload.token };
    default:
      throw new Error();
  }
};
