import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { Container } from '@material-ui/core';
import React from 'react';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';
import Login from './Pages/Login/Login';
import store from './redux/store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {window.location.pathname === '/' ? null : <Header />}
        <div className="app">
          {/* <Container> */}
          <Switch>
            {/* <Route path="/" exact component={Trending} /> */}
            <Route path="/" exact component={Login} />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            {/* <Route path="/login" component={Login} /> */}
          </Switch>
          {/* </Container> */}
        </div>

        {window.location.pathname === '/' ? null : <Header />}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
