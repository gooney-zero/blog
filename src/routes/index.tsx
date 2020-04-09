import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Tags from "../pages/Tags";
import Home from "../pages/Home";
import NotFound from "../components/NotFound";
import Article from 'src/pages/Article';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/posts/:id" component={Article} />
        <Route path="/posts" component={Posts} />
        <Route path="/tags" component={Tags} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

