import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExplorePage from "./components/pages/ExplorePage";
import DashboardPage from "./components/pages/DashboardPage";
import ExternalTokenDetailPage from "./components/pages/ExternalTokenDetailPage";
import SelectDistributorsPage from "./components/pages/SelectDistributorsPage";
import CampaignDetailPage from "./components/pages/CampaignDetailPage";
import TokenCampaignsPage from "./components/pages/TokenCampaignsPage";
import TokenCampaignDetailPage from "./components/pages/TokenCampaignDetailPage";
import TokenHistoryPage from "./components/pages/TokenHistoryPage";
import CreateAudiusCampaignPage from "./components/pages/CreateAudiusCampaignPage";
import CreateWalletCampaignPage from "./components/pages/CreateWalletCampaignPage";
import distributors from "./utils/distributors";
import { TokenProvider } from "./context/token";
import { initialValue, tokenReducer } from "./reducers/tokenContext";
import TokenBasicInformationPage from "./components/pages/TokenBasicInformationPage";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <div>
          <TokenProvider initialValue={initialValue} reducer={tokenReducer}>
            <Route exact path="/" component={ExplorePage} />

            {/* For Creator */}
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route
              exact
              path="/dashboard/:tokenAddress"
              component={ExternalTokenDetailPage}
            />
            <Route
              exact
              path="/dashboard/:tokenAddress/distributors"
              component={SelectDistributorsPage}
            />
            {distributors.map((distributor) => {
              if (distributor.type === "audius") {
                return (
                  <Route
                    key={distributor.id}
                    exact
                    path={`/dashboard/:tokenAddress/distributors/${distributor.id}`}
                    render={(props) => (
                      <CreateAudiusCampaignPage
                        distributorAddress={distributor.id}
                        props={props}
                      />
                    )}
                  />
                );
              }
              if (distributor.type === "wallet") {
                return (
                  <Route
                    key={distributor.id}
                    exact
                    path={`/dashboard/:tokenAddress/distributors/${distributor.id}`}
                    render={(props) => (
                      <CreateWalletCampaignPage
                        distributorAddress={distributor.id}
                        props={props}
                      />
                    )}
                  />
                );
              }
            })}

            <Route
              exact
              path="/dashboard/:tokenAddress/campaigns/:campaignAddress"
              component={CampaignDetailPage}
            />

            {/* For Fan */}
            <Route exact path="/explore" component={ExplorePage} />
            <Route
              exact
              path="/explore/:tokenAddress"
              component={TokenBasicInformationPage}
            />
            <Route
              exact
              path="/explore/:tokenAddress/campaigns"
              component={TokenCampaignsPage}
            />
            <Route
              path="/explore/:tokenAddress/distributors/:distributorAddress/campaigns/:campaignAddress"
              component={TokenCampaignDetailPage}
            />
            <Route
              path="/explore/:tokenAddress/history"
              component={TokenHistoryPage}
            />
          </TokenProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
