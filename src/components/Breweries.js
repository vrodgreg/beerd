import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//>>>>>>>  If ever to use full database - may need to paginate this list of breweries

function Breweries(props) {

  console.log(props)

  let [breweries, setBreweries] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.brewerydb.com/v2/breweries?withLocations=Y&withSocialAccounts=Y&withGuilds=Y&key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        setBreweries(res.data.data);
      });
  }, []);

  console.log(breweries)
  let locationCount = 1

  const showBreweries = () => {
    return breweries.map((eachBrew) => {
      eachBrew.locations ? locationCount = eachBrew.locations.length : locationCount = 1;
      return (
        <Link to={`/Breweries/${eachBrew.id}`}>
        <div className="beerDiv">
          <section className="beerImgSection">
          {eachBrew.images ? <img src={eachBrew.images.squareLarge} height="150" alt="brewery logo"/> : <img src='/images/noImage.jpg' height="150" alt='no label'/>}
          </section>

          <section className="beerDetailSection">
            <h1>{eachBrew.name}</h1>
            <ul>
            {eachBrew.established ? <li>Established: {eachBrew.established}</li> : <li>Established:  NOT LISTED</li>}
            <li>Locations: {locationCount}</li>
            {eachBrew.locations ? <li>{eachBrew.locations[0].locality}, {eachBrew.locations[0].region} - {eachBrew.locations[0].country.name}</li> : <li>Location not given</li>}
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
        <section className="allBeerList">
        {showBreweries()}
        </section>
      </div>
    </div>
  );
}

export default Breweries;
