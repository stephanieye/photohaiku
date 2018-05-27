import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Navbar extends React.Component {

  state = {
    navIsOpen: false
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1>PhotoHaiku</h1>
          </Link>
          <a role="button" className={`navbar-burger ${this.state.navIsOpen? 'is-active' : ''}`} onClick={this.handleToggle}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().sub}`} className="navbar-item"><h2>your profile</h2></Link>}
            {Auth.isAuthenticated() && <Link to='/createpoem' className="navbar-item"><h2>create a poem</h2></Link>}
            <Link to="/poems" className="navbar-item"><h2>browse all photohaiku</h2></Link>
            {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item"><h2>logout</h2></a>}
            {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item"><h2>register</h2></Link>}
            {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item"><h2>login</h2></Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
