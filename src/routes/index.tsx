import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Tags from "../pages/Tags";
import Home from "../pages/Home";
import NotFound from "../components/NotFound";
import Article from 'src/pages/Article';
import BlogMain from 'src/components/Main';
import { ROUTER_NAMW } from 'src/constants/route';
import { Archive } from 'src/pages/Archive';
import { Write } from 'src/pages/Write';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTER_NAMW.MAIN} render={() => (
          <Switch>
            <BlogMain>
              <Route path={ROUTER_NAMW.TAG} component={Tags} />
              <Route path={ROUTER_NAMW.ABOUT} component={About} />
              <Route path={ROUTER_NAMW.ARTICLE} component={Article} />
              <Route path={ROUTER_NAMW.POSTS} component={Posts} />
              <Route path={ROUTER_NAMW.Archive} component={Archive} />

              {/* <Redirect from={ROUTER_NAMW.MAIN} to={ROUTER_NAMW.POSTS} /> */}
            </BlogMain>
          </Switch>
        )} />
        <Route path="/write" component={Write} />
        {/* <Route path="/about" component={About} />
        <Route path="/posts/:id" component={Article} />
        <Route path="/posts" component={Posts} />
        <Route path="/tags" component={Tags} /> */}
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

