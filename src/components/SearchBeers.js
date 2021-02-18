import React from "react";
import { Link } from "react-router-dom";

function SearchBeers(props) {
  return (
    <div>
      <Link to="./">
        <header>
        <img id="beerHouse" src="/images/beerHome.png" alt="little home icon" />
        </header>
      </Link>
    </div>
  );
}

export default SearchBeers;
