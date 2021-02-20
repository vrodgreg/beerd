import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyBeers(props) {
  let [beers, setBeers] = useState([]);

  useEffect(() => {
    axios.get(`https://ironrest.herokuapp.com/beerdBeerList`).then((res) => {
      setBeers(res.data);
    });
  }, []);

  const removeBeer = () => {
    // currentBeer.labels && currentBeer.labels.large
    //   ? (tastedBeer = {
    //       id: currentBeer.id,
    //       name: currentBeer.name,
    //       image: currentBeer.labels.large,
    //     })
    //   : (tastedBeer = {
    //       id: currentBeer.id,
    //       name: currentBeer.name,
    //       image: "/images/noImage.jpg",
    //     });
    // axios
    //   .post("https://ironrest.herokuapp.com/beerdWishList", tastedBeer)
    //   .then((res) => {});
  };

  const showBeers = () => {
    return beers.map((eachBeer) => {
      return (
        <Link to={`/AllBeers/${eachBeer.id}`}>
          <div className="beerList">
            <section>
              <img
                id="beerListImage"
                src={eachBeer.image}
                height="150"
                alt="beer label"
              />
            </section>
            <section id="beerListName">
              <h1>{eachBeer.name}</h1>
              <button
                onClick={() => {
                  removeBeer();
                }}
                id="listBtn"
              >
                Remove
              </button>
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
      <div className="beerListTop">
        <h1 id="beerListH1">My Beer Memories</h1>
        <section className="allBeerList">{showBeers()}</section>
      </div>
    </div>
  );
}

export default MyBeers;
