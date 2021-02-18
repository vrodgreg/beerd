import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useEffect } from 'react';

function AllBeers(props) {
  let [beers, setBeers] = useState([]);
  let [page, setPage] = useState(1);
  let [currentBeerList, setCurrentBeerList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://sandbox-api.brewerydb.com/v2/beers?p=${page}&withBreweries=Y&key=1377adada9f4a5816832d6b99943e0db`
      )
      .then((res) => {
        setBeers(res.data);
        setCurrentBeerList(res.data.data);
      });
  }, [page]);

  console.log(beers);
  // console.log(currentBeerList);

  const showPageButtons = () => {
    let arr = [];
    for (let i = 1; i <= beers.numberOfPages; i++) {
      arr.push(i);
    }
    return arr.map((eachPage) => {
      return (
        <button onClick={(e) => setPage(e.target.value)} value={eachPage}>
          {eachPage}
        </button>
      );
    });
  };

  const showBeers = () => {
    return currentBeerList.map((eachBeer) => {
      console.log(eachBeer.name);

      return (
        <Link to={`/AllBeers/${eachBeer.id}`}>
        <div className="beerDiv">

          <section className="beerImgSection">
          {eachBeer.labels ? <img src={eachBeer.labels.large} height="150" alt="beer label"/> : <img src='/images/noImage.jpg' height="150" alt='no label'/>}
          </section>

          {/* <section className="beerDetailSection">
            <h1>{eachBeer.name}</h1>
            {eachBeer.style ? <p>Style: {eachBeer.style.category.name}</p> : <p>Style:  NOT LISTED</p>}
            <p>ABV: {eachBeer.abv}</p>
            <p>IBU: {eachBeer.ibu}</p>
            {eachBeer.breweries ? <p>Brewery: {eachBeer.breweries[0].name}</p> : <p>Brewery: Not Listed</p>}
          </section> */}

          <section className="beerDetailSection">
            <h1>{eachBeer.name}</h1>
            <ul>
            {eachBeer.style ? <li>Style: {eachBeer.style.category.name}</li> : <li>Style:  NOT LISTED</li>}
            <li>ABV: {eachBeer.abv}</li>
            <li>IBU: {eachBeer.ibu}</li>
            {eachBeer.breweries ? <li>Brewery: {eachBeer.breweries[0].name}</li> : <li>Brewery: Not Listed</li>}
            </ul>
          </section>

        </div>
        </Link>
      );
    });
  };

  return (
    <div>
      <Link to="./">
        <header>
          <img
            id="beerHouse"
            src="/images/beerHome.png"
            alt="little home icon"
          />
        </header>
      </Link>

      {/* <div>{showBeers()}</div> */}

      <div className="pageButtons">
        {/* <button onClick={(e)=>setPage(e.target.value)} value={2}>NEXT PAGE</button> */}
        <section className="allBeerList">
        {showBeers()}
        </section>
        <p>Page</p>
        {showPageButtons()}
      </div>
    </div>
  );
}

export default AllBeers;
