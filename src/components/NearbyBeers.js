import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function NearbyBeers(props) {

  let [locations, setLocations] = useState([]);
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0)
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://api.brewerydb.com/v2/breweries?withLocations=Y&key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        console.log('res', res)
        setLocations(res.data.data);
console.log(locations)
      });

      
  }, []);

  console.log(locations)
let regionsArr=[]
  for (let i=0; i<locations.length; i++) {
    if (locations[i].locations) {
      for (let j=0; j< locations[i].length; j++){
        regionsArr.push(locations[i].locations.region)
      }
    }
 
  }

  console.log('regionsArr', regionsArr)



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
    </div>
  );
}

export default NearbyBeers;
