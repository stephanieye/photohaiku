import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';

import PoemsIndex from './components/poems/Index';
import PoemsShow from './components/poems/Show';
import PoemsNew from './components/poems/New';

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
                <SecureRoute exact path="/poems/new" component={PoemsNew} />
                <Route exact path="/poems/:id" component={PoemsShow} />
                <Route exact path="/poems" component={PoemsIndex} />
                <Route exact path="/login" component={AuthLogin} />
                <Route exact path="/register" component={AuthRegister} />
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
