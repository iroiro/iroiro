export type ACTIONS =
  | {
      type: "startExecution:result";
      payload: { executionArn: string };
    }
  | {
      type: "merkleroot:set";
      payload: { merkleRoot: string; merkleTreeCid: string };
    }
  | {
      type: "describeStatus:update";
      payload: { status: string };
    };

export interface MerkltreeData {
  executionArn: string;
  status: string;
  merkleRoot: string;
  merkleTreeCid: string;
}

export const merkletreeReducer = (
  state: MerkltreeData,
  action: ACTIONS
): MerkltreeData => {
  switch (action.type) {
    case "startExecution:result":
      return {
        ...state,
        executionArn: action.payload.executionArn,
      };
    case "merkleroot:set":
      return {
        ...state,
        merkleRoot: action.payload.merkleRoot,
        merkleTreeCid: action.payload.merkleTreeCid,
        status: "SUCCEEDED",
      };
    case "describeStatus:update":
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const merkltreeInitialState: MerkltreeData = {
  executionArn: "",
  status: "",
  merkleRoot: "",
  merkleTreeCid: "",
};
