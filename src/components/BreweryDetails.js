import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BreweryDetails(props) {
  let [brewery, setBrewery] = useState({});
  let [dadJokes, setDadJokes] = useState([]);
  let [beerList, setBeerList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.brewerydb.com/v2/breweries?ids=${props.match.params.id}&withSocialAccounts=Y&withGuilds=Y&withLocations=Y&key=1377adada9f4a5816832d6b99943e0db`
      )
      .then((res) => {
        setBrewery(res.data.data[0]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.brewerydb.com/v2//brewery/${props.match.params.id}/beers?&key=1377adada9f4a5816832d6b99943e0db`
      )
      .then((res) => {
        setBeerList(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        setDadJokes(res.data);
      });
  }, []);

  console.log(brewery);
  console.log(beerList);

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
            {/* <li>This Thing</li>
              <li>Another Thing</li> */}
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
              <a href={brewery.website} target="_blank">
                {brewery.website}
              </a>
            </li>
          </ul>
        </section>

        {brewery.images && brewery.images.squareLarge ? (
          <img
            className="detailsImage"
            src={brewery.images.squareLarge}
            width="50%"
            alt="brewery logo"
          />
        ) : (
          <img
            className="detailsImage"
            src="/images/noImage.jpg"
            width="50%"
            alt="no label"
          />
        )}
      </div>

      <div className="detailsDescription">
        {/* <p>
          <b>Description</b>
        </p> */}
        <p>{brewery.description}</p>
      </div>
    </div>
  );
}

export default BreweryDetails;
