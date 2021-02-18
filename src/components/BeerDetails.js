import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BeerDetails(props) {
  let [currentBeer, setCurrentBeer] = useState({});
  let [dadJokes, setDadJokes] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://sandbox-api.brewerydb.com/v2/beers?ids=${props.match.params.id}&withBreweries=Y&withIngredients=Y&key=1377adada9f4a5816832d6b99943e0db`
      )
      .then((res) => {
        setCurrentBeer(res.data.data[0]);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://icanhazdadjoke.com/", {headers: {Accept:"application/json"} })
      .then((res) => {
        setDadJokes(res.data);
      });
  }, []);

  console.log(currentBeer);
  console.log(dadJokes)
  // console.log(props)
  // console.log(props.match.params.id)
  // console.log(currentBeer.createDate.substr(0,10))
  let crDate=""

  currentBeer.createDate ? crDate = currentBeer.createDate.substr(0,10) : crDate = "None Given"

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

      <div className="WTF">
        <div className="detailsTop">
          <section className="detailsDetailSection">
            <p id="detailsName">
              <b>{currentBeer.name}</b>
            </p>
            <p>ABV: {currentBeer.abv}</p>
            <p>IBU: {currentBeer.ibu}</p>
            <p>Retired: {currentBeer.isRetired}</p>
            <p>Organic: {currentBeer.isOrganic}</p>
            {currentBeer.glass && currentBeer.glass.name ? <p>Glassware: {currentBeer.glass.name}</p> : <p>Glassware: None listed</p>}
            
            {currentBeer.available && currentBeer.available.description ? (
              <p>Avail.: {currentBeer.available.description}</p>
            ) : (
              <p>Avail.: No Info.</p>
            )}
            <p>Created: {crDate}</p>
          </section>

          {/* <section className="detailsImageSection"> */}
          {currentBeer.labels ? (
            <img
              className="detailsImageSection"
              src={currentBeer.labels.large}
              width="50%"
              alt="beer label"
            />
          ) : (
            <img src="/images/noImage.jpg" width="50%" alt="no label" />
          )}
          {/* </section> */}
        </div>

        <div className="detailsDescription">
          <p><b>Description</b></p>
          <p>{currentBeer.description}</p>
        </div>

        <div className="detailsTop">
          <section className="pairing">
            <p><b>Suggested Joke Pairing</b></p>
            <p>{dadJokes.joke}</p>
          </section>
          <section className="pairing">
            <p><b>Food Pairings</b></p>
            {currentBeer.foodPairings ? <p>{currentBeer.foodPairings}</p> : <p>None Given</p>} 
          </section>
        </div>

        <div>
          <p><b>Ingredients</b></p>
          <div className="ingredients">
          <section>
            <p><b>Hops</b></p>
            {currentBeer.ingredients && currentBeer.ingredients.hops ? <ul>{currentBeer.ingredients.hops.map((eachIng) => {<li>{eachIng.name}</li>})}</ul> : <ul><li>None Listed</li></ul>}
          </section>
          <section>
            <p><b>Malt</b></p>
            {currentBeer.ingredients && currentBeer.ingredients.malt ? <ul>{currentBeer.ingredients.malt.map((eachIng) => {<li>{eachIng.name}</li>})}</ul> : <ul><li>None Listed</li></ul>}
          </section>
          <section>
            <p><b>Yeast</b></p>
            {currentBeer.ingredients && currentBeer.ingredients.yeast ? <ul>{currentBeer.ingredients.yeast.map((eachIng) => {<li>{eachIng.name}</li>})}</ul> : <ul><li>None Listed</li></ul>}
          </section>
          <section>
            <p><b>Adjuncts</b></p>
            {currentBeer.ingredients && currentBeer.ingredients.adjuncts ? <ul>{currentBeer.ingredients.adjuncts.map((eachIng) => {<li>{eachIng.name}</li>})}</ul> : <ul><li>None Listed</li></ul>}
          </section>
        </div>
        </div>

      </div>
    </div>
  );
}

export default BeerDetails;
