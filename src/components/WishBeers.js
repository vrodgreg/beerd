import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function WishBeers(props) {

  let [beers, setBeers] = useState([]);
  let beers2=[]

  useEffect(() => {
    axios
      .get(
        `https://ironrest.herokuapp.com/beerdWishList`
      )
      .then((res) => {
        setBeers(res.data);
        beers2=beers.data
        console.log(typeof beers)
      });
  }, []);

  const showBeers = () => {
    return beers.map((eachBeer)=> {
      return (
        <Link to={`/AllBeers/${eachBeer.id}`}>
          <div className="beerList">
            <section>
              <img id="beerListImage" src={eachBeer.image} height="150" alt="beer label" />
            </section>

            <section id="beerListName">
              <h1>{eachBeer.name}</h1>
            </section>
          </div>

        </Link>
      )
    })
  };


  return (
    <div>
      <Link to="/">
        <header>
        <img id="beerHouse" src="/images/beerHome.png" alt="little home icon" />
        </header>
      </Link>

      <div  className="beerListTop">
        <h1 id="beerListH1">My Beer Wishes</h1>
        <section className="allBeerList">{showBeers()}</section>
      </div>
    </div>
  );
}

export default WishBeers;
