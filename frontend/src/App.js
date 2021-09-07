import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Home, CreatePost, DetailPage } from "./pages";

import "./assets/css/style.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const history = createBrowserHistory({
    baseUrl: process.env.REACT_PUBLIC_URL,
  });

  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/create" component={CreatePost}></Route>
            <Route exact path="/create/:id" component={CreatePost}></Route>
            <Route exact path="/detail/:id" component={DetailPage}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
