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
        setLocations(res.data.data);
        console.log(locations)
      });
      GetAllRegions()
  }, []);

  let regionsArr=[]
  let reducedRegionsArr =[]
  let len = []

  function GetAllRegions () {

    for (let i=0; i<locations.length; i++) {
      console.log(locations[i].locations)
      len = locations[i].locations
      // console.log("len", len)
      if (len) {
        
        for (let j=0; j< len.length; j++){
          console.log(len[j].region)
          regionsArr.push(len[j].region)
        }
      }
    }
    regionsArr.sort()
    console.log(regionsArr)

   regionsArr.forEach(element => {
     if (!reducedRegionsArr.includes(element)) {
       reducedRegionsArr.push(element)
     }
   })
    console.log(reducedRegionsArr)

    return(regionsArr)

  }




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

        <div className="comingSoon">
      <h1>COMING SOON</h1>
    </div>
    
    </div>
  );
}

export default NearbyBeers;
