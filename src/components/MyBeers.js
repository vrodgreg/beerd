import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function MyBeers(props) {
  let[beerDel, setBeerDel] = useState(0)
  let [beers, setBeers] = useState([]);
  let history=useHistory();

  useEffect(() => {
    window.scrollTo(0, 0)
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
      <div className="beerListTop">
        <h1 id="beerListH1">My Beer Memories</h1>
        <section className="allBeerList">{showBeers()}</section>
      </div>
    </div>
  );
}

export default MyBeers;
