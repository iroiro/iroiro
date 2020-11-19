import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateTokenPage from "./components/pages/CreateTokenPage";
import ExplorePage from "./components/pages/ExplorePage";
import DashboardPage from "./components/pages/DashboardPage";
import TokenDetailPage from "./components/pages/TokenDetailPage";
import WithdrawAudiusPage from "./components/pages/WithdrawAudiusPage";
import AudiusDisributionPage from "./components/pages/AudiusDisributionPage";

import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "./utils/web3Modal";

type State = {
  count: number;
  provider: Web3Provider | undefined;
};
type Action = { type: "update_provider"; payload: { provider: Web3Provider } };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "update_provider":
      return { ...state, provider: action.payload.provider };
    default:
      return state;
  }
};

export const AppContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<Action>;
  }
);
const initialState = {
  count: 0,
  provider: undefined,
};

const UpdateWeb3Context = createContext({});
export function useUpdateWeb3() {
  return useContext(UpdateWeb3Context);
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    const provider = new Web3Provider(newProvider);
    dispatch({ type: "update_provider", payload: { provider: provider } });
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      showWeb3Modal();
    }
  }, [showWeb3Modal]);

  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        <UpdateWeb3Context.Provider value={showWeb3Modal}>
          <Router>
            <div>
              <Route exact path="/" component={ExplorePage} />
              <Route path="/create" component={CreateTokenPage} />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/token/:address" component={TokenDetailPage} />
              <Route path="/audius-token" component={WithdrawAudiusPage} />
              <Route
                path="/audius/:address"
                component={AudiusDisributionPage}
              />
            </div>
          </Router>
        </UpdateWeb3Context.Provider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
