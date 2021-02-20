import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

import { changeSiteName } from './services/site.service';
import { logoutAction } from './services/auth.service';

import Home from './containers/Home';
import Login from './containers/Login';
import Posts from './containers/Posts';
import PrivateRoute from './containers/PrivateRoute';
import Post from './containers/Post';
import Librery from './containers/Librery';


class App extends Component {

  render() {
    let loginLink = <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>;
    if (this.props.isLogged === true) {
      loginLink = <li className="nav-item"><Link className="nav-link" to="/login" onClick={this.handlerLogout}>Logout</Link></li>;
    }
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
          <Link to="/">{this.props.siteName}</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" exact to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/posts">Posts</NavLink></li>
              {loginLink}
            </ul>
          </div>
        </nav>

        <div className="container">
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />

          <PrivateRoute path="/posts/:pageNumber?" component={Posts} />
          <PrivateRoute path="/post/:postID" component={Post} />
          <PrivateRoute path="/Librery/:pageNumber?" component={Librery} />
        </div>

      </Router>
    );
  }

  handlerLogout = () => {
    this.props.logout();
  }
}

const mapStateToProps = state => {
  return {
    siteName: state.sitesReducer.siteName,
    isLogged: state.postsReducer.isLogged
  }
}

const mapDispatchToProps = disaptch => {
  return {
    changeSiteName(newSiteName) {
      disaptch(changeSiteName(newSiteName))
    },
    logout() {
      disaptch(logoutAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);