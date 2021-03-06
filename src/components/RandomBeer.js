import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import ReactDOM from 'react-dom';
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function RandomBeer(props) {
  let [currentBeer, setCurrentBeer] = useState({});
  let [dadJokes, setDadJokes] = useState([]);
  let tastedBeer = {};

  //>>>>>>>>>>>>>>>>>>line 14-18 is Modal
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  let [beersWish, setBeersWish] = useState("");
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`https://ironrest.herokuapp.com/beerdWishList`).then((res) => {
      let tempData=res.data
      
      let wish="false"
      for (let i=0; i<tempData.length; i++) {
        if (tempData[i].id === props.match.params.id) {wish="true"} 
      }
      setBeersWish(wish);
    });
  }, []);

  let [beersMy, setBeersMy] = useState("");

  useEffect(() => {
    axios.get(`https://ironrest.herokuapp.com/beerdBeerList`).then((res) => {
      let tempData=res.data
      let list="false"

      if(tempData.length>0) {

      for (let i=0; i<tempData.length; i++) {
        if (tempData[i].id === props.match.params.id) {list="true"} 
      }
    }
      setBeersMy(list);
    });
  }, []);

  const postBeer = () => {
    currentBeer.labels && currentBeer.labels.large
      ? (tastedBeer = {
          id: currentBeer.id,
          name: currentBeer.name,
          image: currentBeer.labels.large,
        })
      : (tastedBeer = {
          id: currentBeer.id,
          name: currentBeer.name,
          image: "/images/noImage.jpg",
        });
    axios
      .post("https://ironrest.herokuapp.com/beerdBeerList", tastedBeer)
      .then((res) => {});
  };

  const postWish = () => {
    currentBeer.labels && currentBeer.labels.large
      ? (tastedBeer = {
          id: currentBeer.id,
          name: currentBeer.name,
          image: currentBeer.labels.large,
        })
      : (tastedBeer = {
          id: currentBeer.id,
          name: currentBeer.name,
          image: "/images/noImage.jpg",
        });
    axios
      .post("https://ironrest.herokuapp.com/beerdWishList", tastedBeer)
      .then((res) => {});
  };

  let [beerid, setBeerid] = useState("")

  useEffect(() => {
    let finalData={}
    let beerid2 = ''
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beer/random?&withBreweries=Y&withIngredients=Y&key=4187045c8fc67d4d7636b85848c8ce67`
      )
      .then((res) => {
        finalData=res.data.data
  beerid2=finalData.id
        setBeerid=beerid2
        GetAllData(beerid2)
        });
  }, []);

  function GetAllData (bid) {
    axios
    .get(
      `https://iron-cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?ids=${bid}&withBreweries=Y&withIngredients=Y&key=4187045c8fc67d4d7636b85848c8ce67`
    )
    .then((res) => {
      setCurrentBeer(res.data.data[0]);
    });
  }

  useEffect(() => {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        setDadJokes(res.data);
      });
  }, []);

  //>>>>>>> check for ingredients and set ingredient category arrays
  let hops = [],
    malt = [],
    yeast = [],
    adjuncts = [];
  currentBeer.ingredients && currentBeer.ingredients.hops
    ? (hops = currentBeer.ingredients.hops)
    : (hops = false);
  currentBeer.ingredients && currentBeer.ingredients.malt
    ? (malt = currentBeer.ingredients.malt)
    : (malt = false);
  currentBeer.ingredients && currentBeer.ingredients.yeast
    ? (yeast = currentBeer.ingredients.yeast)
    : (yeast = false);
  currentBeer.ingredients && currentBeer.ingredients.adjuncts
    ? (adjuncts = currentBeer.ingredients.adjuncts)
    : (adjuncts = false);

  //>>>>Check for create date and set variable for later use
  let crDate = "";
  currentBeer.createDate
    ? (crDate = currentBeer.createDate.substr(0, 10))
    : (crDate = "None Given");

  function NewRandom() {
    setCurrentBeer([])
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
          <img onClick={() => NewRandom()}id="backButton3" src="/images/4LeafClover.png" alt="back button" />
        </header>

      {/* THIS DIV IS THE MODAL CODE TO FOLLOW */}
      {/* <div className="App">
        <button onClick={toggleModal}>Open modal</button>

        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div>My modal dialog.</div>
          <button onClick={toggleModal}>Close modal</button>
        </Modal>
      </div> */}
      {/* MODAL CODE ENDS HERE */}

      <div className="WTF">
        <div className="detailsTop">
          <section className="detailsDetailSection">
            <p id="detailsName">
              <b>{currentBeer.name}</b>
            </p>
            <ul>
              <li>ABV: {currentBeer.abv}</li>
              <li>IBU: {currentBeer.ibu}</li>
              <li>Retired: {currentBeer.isRetired}</li>
              <li>Organic: {currentBeer.isOrganic}</li>
              {currentBeer.glass && currentBeer.glass.name ? (
                <li>Glassware: {currentBeer.glass.name}</li>
              ) : (
                <li>Glassware: None listed</li>
              )}

              {currentBeer.available && currentBeer.available.description ? (
                <li>Avail.: {currentBeer.available.description}</li>
              ) : (
                <li>Avail.: No Info.</li>
              )}
              <li>Created: {crDate}</li>
              {currentBeer.style && currentBeer.style.name ? (
                <div>
                  <li onClick={toggleModal} id="imposterLink">
                    Style: {currentBeer.style.name}
                  </li>
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}
                  >
                    <div>{currentBeer.style.description}</div>
                    <button onClick={toggleModal}>Close</button>
                  </Modal>
                </div>
              ) : (
                <li>Style: None listed</li>
              )}
            </ul>

            <div className="listButtons">
              {beersMy==="false" ? (<button
                id="listBtn"
                onClick={() => {
                  postBeer();
                }}
              >
                Add to Tasted
              </button>) : (<button className="listButtonDone">Already Tasted</button>)}


              {beersWish==="false" ? (<button
                id="listBtn"
                onClick={() => {
                  postWish();
                }}
              >
                Add to Wish List
              </button>) : (<button className="listButtonDone">Already Dreamin</button>)}
            </div>
          </section>
          {currentBeer.labels ? (
            <img
              className="detailsImage"
              src={currentBeer.labels.large}
              alt="beer label"
            />
          ) : (
            <img
              className="detailsImage"
              src="/images/noImage.jpg"
              alt="no label"
            />
          )}
        </div>
        <div className="detailsDescription">
          <p>
            <b>Description</b>
          </p>
          <p>{currentBeer.description}</p>
        </div>

        <div className="detailsTop">
          <section className="pairing">
            <p>
              <b>Suggested Joke Pairing</b>
            </p>
            <p>{dadJokes.joke}</p>
          </section>
          <section className="pairing">
            <p>
              <b>Food Pairings</b>
            </p>
            {currentBeer.foodPairings ? (
              <p>{currentBeer.foodPairings}</p>
            ) : (
              <p>None Given</p>
            )}
          </section>
        </div>

        <div className="detailsTop">
          <section className="pairing">
            <p>
              <b>Brewery</b>
            </p>

            {currentBeer.breweries ? (
              <section className="brewerySect">
                {currentBeer.breweries[0].images && currentBeer.breweries[0].images.squareLarge ? (
                  <Link to={`/Breweries/${currentBeer.breweries[0].id}`}>
                    <img
                      id="breweryImage"
                      src={currentBeer.breweries[0].images.squareLarge}
                      alt="brewery logo"
                    />
                  </Link>
                ) : (
                  <img
                    id="breweryImage"
                    src="/images/noImage.jpg"
                    alt="no label"
                  />
                )}

                <section className="brewerySect2">
                  <Link to={`/Breweries/${currentBeer.breweries[0].id}`}>
                    <p>{currentBeer.breweries[0].name}</p>
                  </Link>
                  <p>
                    {currentBeer.breweries[0].locations[0].locality},{" "}
                    {currentBeer.breweries[0].locations[0].region}
                  </p>
                  <a
                    href={currentBeer.breweries[0].website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {currentBeer.breweries[0].website}
                  </a>
                </section>
              </section>
            ) : (
              <p>None Listed</p>
            )}
          </section>
          <section className="pairing">
            <p>
              <b>Nutritional Info</b>
            </p>
            <p>Serving Size: Not listed</p>
            <p>Calories: Not Listed</p>
          </section>
        </div>

        <div className="ingredMain">
          <p>
            <b>Ingredients</b>
          </p>
          <div className="ingredients">
            <section>
              <p>
                <b>Hops</b>
              </p>
              {hops ? (
                <ul>
                  {hops.map((eachIng) => (
                    <li>{eachIng.name}</li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>None Listed</li>
                </ul>
              )}
            </section>
            <section>
              <p>
                <b>Malt</b>
              </p>
              {malt ? (
                <ul>
                  {malt.map((eachIng) => (
                    <li>{eachIng.name}</li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>None Listed</li>
                </ul>
              )}
            </section>
            <section>
              <p>
                <b>Yeast</b>
              </p>
              {yeast ? (
                <ul>
                  {yeast.map((eachIng) => (
                    <li>{eachIng.name}</li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>None Listed</li>
                </ul>
              )}
            </section>
            <section>
              <p>
                <b>Adjuncts</b>
              </p>
              {adjuncts ? (
                <ul>
                  {adjuncts.map((eachIng) => (
                    <li>{eachIng.name}</li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>None Listed</li>
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomBeer;