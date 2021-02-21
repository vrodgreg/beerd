import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyBeers(props) {
  let[beerDel, setBeerDel] = useState(0)
  let [beers, setBeers] = useState([]);

  useEffect(() => {
    axios.get(`https://ironrest.herokuapp.com/beerdBeerList`).then((res) => {
      setBeers(res.data);
    });
  }, [beerDel]);

  const removeBeer = (beerToRmv) => {
    axios.delete(
      `https://ironrest.herokuapp.com/deleteOne/beerdBeerList?id=${beerToRmv}`
    );
    incrementCounter()
  };

  const incrementCounter = () => {
    setBeerDel(beerDel+1)
  }

  const showBeers = () => {
    return beers.map((eachBeer) => {
      return (
        <div className="beerList">
          <Link to={`/AllBeers/${eachBeer.id}`}>
            <section>
              <img
                id="beerListImage"
                src={eachBeer.image}
                height="150"
                alt="beer label"
              />
            </section>
          </Link>
          
            <section id="beerListName">
            <Link to={`/AllBeers/${eachBeer.id}`}><h1>{eachBeer.name}</h1></Link>
              <button
                onClick={() => {
                  removeBeer(eachBeer.id);
                }}
                id="listBtn"
              >
                Remove
              </button>
            </section>
          
        </div>
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
      <div className="beerListTop">
        <h1 id="beerListH1">My Beer Memories</h1>
        <section className="allBeerList">{showBeers()}</section>
      </div>
    </div>
  );
}

export default MyBeers;
