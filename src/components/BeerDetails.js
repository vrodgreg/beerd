import React from "react";
import { Link } from "react-router-dom";

  // const showBeers = () => {
  //   return beers.map(eachBeer => {
  //       console.log(eachBeer.id)
  //       return (
  //           <Link to={`/beers/${eachBeer.id}`}>
  //           <div className="beerDiv">
  //               <section className="beerImgSection">
  //               {/* <img src={eachBeer.labels.medium} height="150" alt="beer bottle label"/> */}
  //               </section>
  //               <h1>{eachBeer.name}</h1>
  //               {/* <p>Style: {eachBeer.style.name}</p> */}
  //               <section className="beerDetailSection">
  //               <p>abv: {eachBeer.abv}</p>
  //               <p>ibu: {eachBeer.ibu}</p>
  //               <p>Creation Date: {eachBeer.createDate}</p>
  //               {/* <p>Retired: {eachBeer.isretired}</p>
  //               <p>Organic: {eachBeer.isOrganic}</p>
  //               <p>Available: {eachBeer.available.name}</p>
  //               <p>{eachBeer.decription}</p>
  //               <p>Reccommended Glassware: {eachBeer.glass.name}</p>
  //               <p>Ingredients</p> */}
  //               {/* //>>>>NEED TO ADD ALL THE OTHER FIELDS FOR THE DETAILS PAGE. */}
  //               </section>
  //           </div>
  //           </Link>
  //       )
  //   })
  // }

function BeerDetails(props) {
  return (
    <div>
     <Link to="./">
        <header>
        <img id="beerHouse" src="./images/beerHome.png" alt="little home icon" />
        </header>
      </Link>
    </div>  
  );
}

export default BeerDetails;
