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
        <div className="app">
          <Switch>
            <Route path="/login" exact component={Login} />
            <>
              <Header />
              <Route path="/" exact component={Trending} />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
            </>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
