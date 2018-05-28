import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';
import Flash from '../lib/Flash';

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
    Flash.setMessage('welcome', 'you have successfully logged out.');
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className='container'>
          <div className="navbar-brand">
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/poems">
              <h1>photohaiku</h1>
            </Link>}
            {! Auth.isAuthenticated() && <Link className="navbar-item" to="/">
              <h1>photohaiku</h1>
            </Link>}
            <a role="button" className={`navbar-burger ${this.state.navIsOpen? 'is-active' : ''}`} onClick={this.handleToggle}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">

              <Link to='/createpoem' className="navbar-item"><h3>create a photohaiku</h3></Link>
              {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item"><h3>register</h3></Link>}
              {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().sub}`} className="navbar-item"><h3>your profile</h3></Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item"><h3>login</h3></Link>}
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item"><h3>logout</h3></a>}

            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
