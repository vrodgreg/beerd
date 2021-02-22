import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function ByStyle(props) {
  window.scrollTo(0, 0);
  let history = useHistory();

  let [styles, setStyles] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/styles?key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        setStyles(res.data.data);
      });
  }, []);

  let [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/categories?key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        setCategories(res.data.data);
      });
  }, []);

  const showCategories = () => {
    return categories.map((eachCat) => {
      let matchingStyle = styles.filter(
        (eachStyle) => eachStyle.categoryId === eachCat.id
      );
      return (
        <div>
          <p>
            <h2>{eachCat.name}</h2>
          </p>
          <ul className="styleList">
            {matchingStyle.map((eachStyle) => (
              <Link to={`/ByStyleResults/${eachStyle.id}`}>
              <li key={eachStyle.id}>{eachStyle.name}</li>
              </Link>
            ))}
          </ul>
        </div>
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

      <div className="byStyleList">{showCategories()}</div>
    </div>
  );
}

export default ByStyle;
