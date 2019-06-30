import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router , Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NewList from './components/NewList';
import CreateNew from './components/CreateNew';
import EditNew from './components/EditNew';
window.moment = require('moment');
const history = createBrowserHistory({
    basename: 'reactjs_demo'
});
class App extends Component {
  render() {
    return (
      <Router  history={history}>
        <Switch>
          <Route exact  path='/' component={NewList} />
          <Route path='/create-title' component={CreateNew} />
          <Route path='/users/edit/:id' component={EditNew} />
	    </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('example'));