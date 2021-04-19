import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { Container } from '@material-ui/core';
import React from "react";


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="app">
    <Container>
      <Switch>
        <Route path= '/'component={Trending} exact/> 
        <Route path= '/movies'component={Movies}/>
        <Route path= '/search'component={Search}/>
        
      </Switch>

    </Container>
    </div>
   
    <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
