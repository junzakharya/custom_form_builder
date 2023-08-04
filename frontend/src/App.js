import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormEditor from './components/FormEditor';
import FormRenderer from './components/FormRenderer';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={FormEditor} />
          <Route path="/preview" component={FormRenderer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
