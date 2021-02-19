import React from 'react';
import Axios from 'axios'
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import AllBeers from './components/AllBeers'
import BeerDetails from './components/BeerDetails'
import Breweries from './components/Breweries'
import BreweryDetails from './components/BreweryDetails'
import ByStyle from './components/ByStyle'
import MyBeers from './components/MyBeers'
import NearbyBeers from './components/NearbyBeers'
import RandomBeer from './components/RandomBeer'
import SearchBeers from './components/SearchBeers'
import WishBeers from './components/WishBeers'

function App() {

  return (


  
    <div className="App" id="root">
      
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/AllBeers" render={(props) => <AllBeers {...props} />} />
        <Route exact path="/AllBeers/:id" render={(props) => <BeerDetails {...props} />} />
        <Route exact path="/Breweries" render={(props) => <Breweries {...props} />} />
        <Route exact path="/Breweries/:id" render={(props) => <BreweryDetails {...props} />} />
        <Route exact path="/ByStyle" render={(props) => <ByStyle {...props} />} />
        <Route exact path="/MyBeers" render={(props) => <MyBeers {...props} />} />
        <Route exact path="/NearbyBeers" render={(props) => <NearbyBeers {...props} />} />
        <Route exact path="/RandomBeer" render={(props) => <RandomBeer {...props} />} />
        <Route exact path="/SearchBeers" render={(props) => <SearchBeers {...props} />} />
        <Route exact path="/WishBeers" render={(props) => <WishBeers {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
