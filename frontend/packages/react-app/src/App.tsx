import React, { Component, useContext, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopPage from "./components/pages/TopPage";
import CreateTokenPage from "./components/pages/CreateTokenPage";
import ExplorePage from "./components/pages/ExplorePage";
import DashboardPage from "./components/pages/DashboardPage";
import TokenDetailPage from "./components/pages/TokenDetailPage";
import WithdrawAudiusPage from "./components/pages/WithdrawAudiusPage";
import AudiusDisributionPage from "./components/pages/AudiusDisributionPage";
import ExternalTokenDetailPage from "./components/pages/ExternalTokenDetailPage";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Route exact path="/" component={TopPage} />
          <Route path="/create" component={CreateTokenPage} />
          <Route path="/explore" component={ExplorePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route
            path="/dashboard/:address"
            component={ExternalTokenDetailPage}
          ></Route>
          <Route path="/token/:address" component={TokenDetailPage} />
          <Route path="/audius-token" component={WithdrawAudiusPage} />
          <Route path="/audius/:address" component={AudiusDisributionPage} />
        </div>
      </Router>
    </div>
  );
};

export default App;
