import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

import "./style/style.css";

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={SongList} />
            <Route exact path="/songs/new" component={SongCreate} />
            <Route exact path="/songs/:id" component={SongDetail} />
          </Switch>
        </HashRouter>
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
