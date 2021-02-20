import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AllBeers(props) {
  let [beers, setBeers] = useState([]);
  let [page, setPage] = useState(1);
  let [currentBeerList, setCurrentBeerList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?p=${page}&withBreweries=Y&key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        setBeers(res.data);
        setCurrentBeerList(res.data.data);
      });
  }, [page]);

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
      return (
        <Link to={`/AllBeers/${eachBeer.id}`}>
          <div className="beerDiv">
            <section className="beerImgSection">
              {eachBeer.labels ? (
                <img
                  src={eachBeer.labels.large}
                  height="150"
                  alt="beer label"
                />
              ) : (
                <img src="/images/noImage.jpg" height="150" alt="no label" />
              )}
            </section>

            <section className="beerDetailSection">
              <h1>{eachBeer.name}</h1>
              <ul>
                {eachBeer.style ? (
                  <li>Style: {eachBeer.style.category.name}</li>
                ) : (
                  <li>Style: NOT LISTED</li>
                )}
                <li>ABV: {eachBeer.abv}</li>
                <li>IBU: {eachBeer.ibu}</li>
                {eachBeer.breweries ? (
                  <li>Brewery: {eachBeer.breweries[0].name}</li>
                ) : (
                  <li>Brewery: Not Listed</li>
                )}
              </ul>
            </section>
          </div>
        </Link>
      );
    });
  };

  return (
    <div>
      <Link to="/">
        <header>
          <img
            id="beerHouse"
            src="/images/beerHome.png"
            alt="little home icon"
          />
        </header>
      </Link>

      <div className="pageButtons">
        <section className="allBeerList">{showBeers()}</section>
        <p>Page</p>
        {showPageButtons()}
      </div>
    </div>
  );
}

export default AllBeers;
