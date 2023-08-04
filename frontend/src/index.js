import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import FormRenderer from './components/FormRenderer'; 

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} /> {/* Form Editor */}
      <Route path="/preview" component={FormRenderer} /> {/* Form Renderer */}
    </Switch>
  </Router>,
  document.getElementById('root')
);
