import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function ByStyleResults(props) {
  let [beers, setBeers] = useState([]);
  let [page, setPage] = useState(1);
  let [currentBeerList, setCurrentBeerList] = useState([]);

  let history = useHistory();
  console.log(props);

  let [styles, setStyles] = useState([]);
  let temp = [];
  let damnit=0

  useEffect(() => {
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/styles?key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        temp = res.data.data;
        console.log("TEMP", temp)
        console.log(props.match.params.id)
        damnit=parseInt(props.match.params.id)-1
        console.log("DAMN", damnit)
        

        setStyles(temp[damnit]);
      });
  }, []);

  console.log("Styales", styles);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?styleId=${props.match.params.id}&withBreweries=Y&key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        setBeers(res.data);
        setCurrentBeerList(res.data.data);
      });
  }, []);

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
      <header>
        <img
          onClick={() => history.goBack()}
          id="backButton"
          src="/images/backIcon.png"
          alt="back button"
        />
        <Link id="headerLink" to="/">
          <img
            id="beerHouse"
            src="/images/beerHome.png"
            alt="little home icon"
          />
        </Link>
        <img id="backButton2" src="/images/backIcon.png" alt="back button" />
      </header>

      <div className="styleHeadings">
    
          {/* <h1>Category: {styles.category.name}</h1>
          <h2>Style: {styles.name}</h2> */}
    
      </div>
      <section className="allBeerList">{showBeers()}</section>
    </div>
  );
}

export default ByStyleResults;
