import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopPage from "./components/pages/TopPage";
import CreateTokenPage from "./components/pages/CreateTokenPage";
import ExplorePage from "./components/pages/ExplorePage";
import DashboardPage from "./components/pages/DashboardPage";
import TokenDetailPage from "./components/pages/TokenDetailPage";
import WithdrawAudiusPage from "./components/pages/WithdrawAudiusPage";
import AudiusDisributionPage from "./components/pages/AudiusDisributionPage"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={ExplorePage}/>
            <Route path='/create' component={CreateTokenPage}/>
            <Route path='/dashboard' component={DashboardPage}/>
            <Route path='/token/:address' component={TokenDetailPage}/>
            <Route path='/audius-token' component={WithdrawAudiusPage}/>
            <Route path='/audius/:address' component={AudiusDisributionPage}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;