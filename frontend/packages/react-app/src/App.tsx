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
import { HashRouter as Router, Route, Switch } from "react-router-dom";
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
import { NotFoundPageTemplate } from "./components/templates/NotFoundPageTemplate";
import CreateEmailCampaignPage from "./components/pages/CreateEmailCampaignPage";
import TopPageTemplate from "./components/templates/TopPageTemplate";
import NFTDashboardPage from "./components/pages/NFTDashboardPage";
import CreateWalletNFTCampaignPage from "./components/pages/CreateWalletNFTCampaignPage";
import CreateUUIDNFTCampaignPage from "./components/pages/CreateUUIDNFTCampaignPage";
import CreateEmailNFTCampaignPage from "./components/pages/CreateEmailNFTCampaignPage";
import NFTCampaignsPage from "./components/pages/NFTCampaignsPage";
import NFTCampaignDetailPage from "./components/pages/NFTCampaignDetailPage";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <div>
          <TokenProvider initialValue={initialValue} reducer={tokenReducer}>
            <Switch>
              <Route exact path="/" component={TopPageTemplate} />
              {/* For Creator */}
              <Route exact path="/dashboard/token" component={DashboardPage} />
              <Route exact path="/dashboard/nft" component={NFTDashboardPage} />
              <Route
                exact
                path="/dashboard/token/:tokenAddress"
                component={ExternalTokenDetailPage}
              />
              <Route
                exact
                path="/dashboard/token/:tokenAddress/distributors"
                component={SelectDistributorsPage}
              />
              {/* TODO Remove repetition */}
              {distributors.map((distributor) => {
                if (distributor.disabled) {
                  return;
                }
                if (distributor.type === "wallet") {
                  const path = `/dashboard/token/distributors/${distributor.id}/${distributor.type}`;
                  return (
                    <Route
                      key={distributor.id}
                      exact
                      path={path}
                      render={(props) => (
                        <CreateWalletCampaignPage
                          distributorAddress={distributor.id}
                          props={props}
                        />
                      )}
                    />
                  );
                }
                if (distributor.type === "wallet-nft") {
                  const path = `/dashboard/nft/distributors/${distributor.id}/${distributor.type}`;
                  return (
                    <Route
                      key={distributor.id}
                      exact
                      path={path}
                      render={(props) => (
                        <CreateWalletNFTCampaignPage
                          distributorAddress={distributor.id}
                          props={props}
                        />
                      )}
                    />
                  );
                }
                if (distributor.type === "uuid") {
                  const path = `/dashboard/token/distributors/${distributor.id}/${distributor.type}`;
                  return (
                    <Route
                      key={distributor.id}
                      exact
                      path={path}
                      render={(props) => (
                        <CreateUUIDCampaignPage
                          distributorAddress={distributor.id}
                          props={props}
                        />
                      )}
                    />
                  );
                }
                if (distributor.type === "uuid-nft") {
                  const path = `/dashboard/nft/distributors/${distributor.id}/${distributor.type}`;
                  return (
                    <Route
                      key={distributor.id}
                      exact
                      path={path}
                      render={(props) => (
                        <CreateUUIDNFTCampaignPage
                          distributorAddress={distributor.id}
                          props={props}
                        />
                      )}
                    />
                  );
                }
                if (distributor.type === "email") {
                  const path = `/dashboard/token/distributors/${distributor.id}/${distributor.type}`;
                  return (
                    <Route
                      key={distributor.id}
                      exact
                      path={path}
                      render={(props) => (
                        <CreateEmailCampaignPage
                          distributorAddress={distributor.id}
                          props={props}
                        />
                      )}
                    />
                  );
                }
                if (distributor.type === "email-nft") {
                  const path = `/dashboard/nft/distributors/${distributor.id}/${distributor.type}`;
                  return (
                    <Route
                      key={distributor.id}
                      exact
                      path={path}
                      render={(props) => (
                        <CreateEmailNFTCampaignPage
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
                path="/dashboard/token/:tokenAddress/distributors/:distributorAddress/campaigns/:campaignId"
                component={CampaignDetailPage}
              />
              <Route
                exact
                path="/dashboard/nft/distributors/:distributorAddress/campaigns/:campaignId"
                component={CampaignDetailPage}
              />
              {/* For Fan */}
              <Route exact path="/explore/token" component={ExplorePage} />
              <Route
                exact
                path="/explore/token/:tokenAddress"
                component={ExplorePage}
              />
              <Route
                exact
                path="/explore/token/:tokenAddress/campaigns"
                component={TokenCampaignsPage}
              />
              <Route
                path="/explore/token/:tokenAddress/distributors/:distributorAddress/campaigns/:campaignId"
                component={TokenCampaignDetailPage}
              />
              <Route
                path="/explore/token/:tokenAddress/history"
                component={TokenHistoryPage}
              />
              <Route
                exact
                path="/explore/nft/campaigns"
                component={NFTCampaignsPage}
              />
              <Route
                path="/explore/nft/distributors/:distributorAddress/campaigns/:campaignId"
                component={NFTCampaignDetailPage}
              />
              <Route path="/explore/nft/history" component={TokenHistoryPage} />
              <Route component={NotFoundPageTemplate} />
            </Switch>
          </TokenProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
