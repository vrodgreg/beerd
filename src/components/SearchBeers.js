import React from "react";
import { Link, useHistory } from "react-router-dom";

function SearchBeers(props) {
  let history=useHistory();
  return (
    <div>
        <header>
          <img onClick={() => history.goBack()} id="backButton" src="/images/backIcon.png" alt="back button" />
          <Link id="headerLink" to="/">
          <img
            id="beerHouse"
            src="/images/beerHome.png"
            alt="little home icon"
          />
          </Link>
          <img id="backButton2" src="/images/backIcon.png" alt="back button" />
        </header>
    </div>
  );
}

export default SearchBeers;
