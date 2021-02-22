import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function BreweryDetails(props) {
  let [brewery, setBrewery] = useState({});
  let [dadJokes, setDadJokes] = useState([]);
  let [beerList, setBeerList] = useState([]);
  let history = useHistory();

  useEffect(() => {
    // window.scrollTo(0, 0)
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://api.brewerydb.com/v2/breweries?ids=${props.match.params.id}&withSocialAccounts=Y&withGuilds=Y&withLocations=Y&key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        setBrewery(res.data.data[0]);
      });
  }, );

  useEffect(() => {
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://api.brewerydb.com/v2//brewery/${props.match.params.id}/beers?&key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        setBeerList(res.data.data);
      });
  }, );

  useEffect(() => {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        setDadJokes(res.data);
      });
  }, []);

  let socAcc = []
  let guildList = []
  let locList = []
  brewery.socialAccounts ? socAcc = brewery.socialAccounts : socAcc = false
  brewery.guilds ? guildList =brewery.guilds : guildList = false
  brewery.locations ? locList = brewery.locations : locList = [{name: "None Listed"}]

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

      <div className="detailsTop">
        <section className="detailsDetailSection">
          <p id="detailsName">
            <b>{brewery.name}</b>
          </p>
          <ul>
            {brewery.established ? (
              <li>Established: {brewery.established}</li>
            ) : (
              <li>Established: NOT LISTED</li>
            )}
            {brewery.locations ? (
              <li>
                {brewery.locations[0].locality}, {brewery.locations[0].region} -{" "}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{brewery.locations[0].country.name}
              </li>
            ) : (
              <li>Location not given</li>
            )}
            {brewery.locations ? (
              <li>Locations: {brewery.locations.length}</li>
            ) : (
              <li>Locations: 1</li>
            )}

            <li>
              <a href={brewery.website} target="_blank" rel="noreferrer">
                {brewery.website}
              </a>
            </li>
          </ul>
        </section>

        {brewery.images && brewery.images.squareLarge ? (
          <img
            className="detailsImage"
            src={brewery.images.squareLarge}
            // width="40%"
            // height="auto"
            alt="brewery logo"
          />
        ) : (
          <img
            className="detailsImage"
            src="/images/noImage.jpg"
            // width="40%"
            alt="no label"
          />
        )}
      </div>

      <div className="detailsDescription">
        <p>{brewery.description}</p>
      </div>

      <div className="detailsTop">
        <section className="social">
          <p>
            <b>Social Connections</b>
            {socAcc ? (
                <ul>
                  {socAcc.map((eachIng) => (
                    <li><a href={eachIng.socialMedia.website} target="_blank" rel="noreferrer">
                    {eachIng.socialMedia.name}
              </a></li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>None Listed</li>
                </ul>
              )}
          </p>
        </section>
        <section className="social">
          <p>
            <b>Guild Memberships</b>
            <ul>
            {guildList ? (
                <ul>
                  {guildList.map((eachIng) => (
                    <li><a href={eachIng.website} target="_blank" rel="noreferrer">
                    {eachIng.name}
              </a></li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>None Listed</li>
                </ul>
              )}
            </ul>
          </p>
        </section>
      </div>

      <div >
      <p className="beersBrewed"><b>Beers Brewed</b></p>
      <div className="breweryBeerList">
      {beerList.map((eachBeer) => 
       <Link to={`/AllBeers/${eachBeer.id}`}>
        <div>
          <p>{eachBeer.name}</p>
        </div>
         </Link>
      )}
      </div>
              
 
                
      </div>

      <div>
      <section className="tourJoke">
        <p><b>Brewery Tour Guide Joke</b></p>
          <p>{dadJokes.joke}</p>
          </section>
          <section className="brewLocations">
            <p><b>Locations</b></p>
            {locList ? 
            locList.map((eachLoc) =>
            <div id="indvLoc"><p><b>{eachLoc.name}</b></p>
            <p>{eachLoc.streetAddress}</p>
            <p>{eachLoc.locality}, {eachLoc.region} {eachLoc.postalCode}</p>
            <p>{eachLoc.phone}</p>
            <p>Open to the Public: {eachLoc.openToPublic}</p></div>)
            :
            <p>None Listed</p>
            }
          </section>
      </div>

    </div>
  );
}

export default BreweryDetails;
