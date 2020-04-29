import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Tags from '../pages/Tags';
import Home from '../pages/Home';
import NotFound from '../components/NotFound';
import Article from 'src/pages/Article';
import BlogMain from 'src/components/Main';
import { PATH_NAME } from 'src/constants/route';
import { Archive } from 'src/pages/Archive';
import { Write } from 'src/pages/Write';
import { PlainPosts } from 'src/pages/PlainPosts';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route
                    path={PATH_NAME.MAIN}
                    render={() => (
                        <Switch>
                            <BlogMain>
                                <Route path={PATH_NAME.TAG} component={Tags} />
                                <Route path={PATH_NAME.ABOUT} component={About} />
                                <Route path={PATH_NAME.ARTICLE} component={Article} />
                                <Route path={PATH_NAME.POSTS} component={Posts} />
                                <Route path={PATH_NAME.Archive} component={Archive} />
                                <Route path={PATH_NAME.PLAIN_POST} component={PlainPosts} />

                                {/* <Redirect from={ROUTER_NAMW.MAIN} to={ROUTER_NAMW.POSTS} /> */}
                            </BlogMain>
                        </Switch>
                    )}
                />
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
