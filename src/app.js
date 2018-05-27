import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';

import PoemNew from './components/poems/PoemNew';
import PoemIndex from './components/poems/PoemIndex';
import PoemShow from './components/poems/PoemShow';

import UsersIndex from './components/users/Index';
import UsersShow from './components/users/Show';
import UsersEdit from './components/users/Edit';

import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';

import SecureRoute from './components/common/SecureRoute';
import FlashMessage from './components/common/FlashMessage';
// import NotFound from './components/common/NotFound';



import 'bulma';
import './scss/style.scss';



class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Navbar />
          <FlashMessage />
          <section className='section'>
            <div className='container'>
              <Switch>

                <SecureRoute exact path="/users/:id/edit" component={UsersEdit} />
                <Route exact path="/users/:id" component={UsersShow} />
                <Route exact path="/users" component={UsersIndex} />
                <Route exact path="/login" component={AuthLogin} />
                <Route exact path="/register" component={AuthRegister} />
                <Route exact path="/createpoem" component={PoemNew} />
                <Route exact path="/poems" component={PoemIndex} />
                <Route exact path="/poems/:id" component={PoemShow} />
                <Route exact path="/" component={Home} />
                {/* <Route component={NotFound} />  */}
              </Switch>
            </div>
          </section>
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
