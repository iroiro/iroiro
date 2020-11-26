export interface TokenInfo {
  token: {
    name: string;
    tokenAddress: string;
  };
}

export type ACTIONS = {
  type: "SET_TOKEN";
  payload: TokenInfo;
};

export const tokenReducer = (state: TokenInfo, action: ACTIONS) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload.token };
    default:
      throw new Error();
  }
};
