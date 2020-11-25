import React, { Component, useContext, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExplorePage from "./components/pages/ExplorePage";
import DashboardPage from "./components/pages/DashboardPage";
import TokenDetailPage from "./components/pages/TokenDetailPage";
import ExternalTokenDetailPage from "./components/pages/ExternalTokenDetailPage";
import SelectDistributersPage from "./components/pages/SelectDistributersPage";
import NewDistributerPage from "./components/pages/NewDistributerPage";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Route exact path="/" component={ExplorePage} />

          {/* For Creator */}
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route
            path="/dashboard/:address"
            component={ExternalTokenDetailPage}
          />
          <Route
            path="/dashboard/distributers"
            component={SelectDistributersPage}
          />
          <Route
            exact
            path="/dashboard/distributer/:address"
            component={NewDistributerPage}
          />
          <Route
            path="/dashboard/distributer/:address/:campaignId"
            component={NewDistributerPage}
          />

          {/* For Fan */}
          <Route exact path="/explore" component={ExplorePage} />
          <Route exact path="/explore/:address" component={TokenDetailPage} />
          <Route path="/explore/:address/basic" component={TokenDetailPage} />
          <Route
            path="/explore/:address/campaigns"
            component={TokenDetailPage}
          />
          <Route
            path="/explore/:address/:campaignId"
            component={TokenDetailPage}
          />
          <Route path="/explore/:address/history" component={TokenDetailPage} />
        </div>
      </Router>
    </div>
  );
};

export default App;
