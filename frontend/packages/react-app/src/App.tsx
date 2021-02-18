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

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExplorePage from "./components/pages/ExplorePage";
import DashboardPage from "./components/pages/DashboardPage";
import ExternalTokenDetailPage from "./components/pages/ExternalTokenDetailPage";
import SelectDistributorsPage from "./components/pages/SelectDistributorsPage";
import CampaignDetailPage from "./components/pages/CampaignDetailPage";
import TokenCampaignsPage from "./components/pages/TokenCampaignsPage";
import TokenCampaignDetailPage from "./components/pages/TokenCampaignDetailPage";
import TokenHistoryPage from "./components/pages/TokenHistoryPage";
import CreateWalletCampaignPage from "./components/pages/CreateWalletCampaignPage";
import distributors from "./utils/distributors";
import CreateUUIDCampaignPage from "./components/pages/CreateUUIDCampaignPage";
import { TokenProvider } from "./context/token";
import { initialValue, tokenReducer } from "./reducers/tokenContext";
import TokenBasicInformationPage from "./components/pages/TokenBasicInformationPage";
import { NotFoundPageTemplate } from "./components/templates/NotFoundPageTemplate";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <div>
          <TokenProvider initialValue={initialValue} reducer={tokenReducer}>
            <Switch>
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
                if (distributor.disabled) {
                  return;
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
                if (distributor.type === "uuid") {
                  return (
                    <Route
                      key={distributor.id}
                      exact
                      path={`/dashboard/:tokenAddress/distributors/${distributor.id}`}
                      render={(props) => (
                        <CreateUUIDCampaignPage
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
                path="/dashboard/:tokenAddress/distributors/:distributorAddress/campaigns/:campaignAddress"
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
              <Route component={NotFoundPageTemplate} />
            </Switch>
          </TokenProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
