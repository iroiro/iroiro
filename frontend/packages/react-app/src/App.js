import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopPage from "./components/pages/TopPage";
import CreateTokenPage from "./components/pages/CreateTokenPage";
import ExplorePage from "./components/pages/ExplorePage";
import DashboardPage from "./components/pages/DashboardPage";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={TopPage}/>
            <Route path='/create' component={CreateTokenPage}/>
            <Route path='/explore' component={ExplorePage}/>
            <Route path='/dashboard' component={DashboardPage}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;