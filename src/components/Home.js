import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
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

      <div className="home">
        <Link to="./AllBeers">
          <section className="homeSec" >
            <img src="./images/manyBeersCropped.jpg" alt="a lot of beers" />
            <p>All the Beers</p>
          </section>
        </Link>

        <Link to="./SearchBeers">
          <section className="homeSec" >
            <img src="./images/singleBeer2.jfif" alt="a single glass of beer" />
            <p>Find A Lucky Beer</p>
          </section>
        </Link>

        <Link to="./NearbyBeers">
          <section className="homeSec" >
            <img
              src="./images/nearbyBeersCropped.jpg"
              alt="outdoor beer sign"
            />
            <p>Nearby Beers</p>
          </section>
        </Link>

        <Link to="./Breweries">
          <section className="homeSec" >
            <img src="./images/brewery.jpg" alt="interior brewery" />
            <p>Breweries</p>
          </section>
        </Link>

        <Link to="./ByStyle">
          <section className="homeSec" >
            <img
              src="./images/styleBeersCropped.jpg"
              alt="different beer styles"
            />
            <p>Beer by Style</p>
          </section>
        </Link>

        <div id="myBeers">
          <Link to="./MyBeers">
            <section className="mySec">
              <img
                src="./images/singleBeer3.jfif"
                alt="a single glass of beer"
              />
              <p>My Beer Memories</p>
            </section>
          </Link>

          <Link to="./WishBeers">
            <section className="mySec">
              <img
                src="./images/splashyBeer.jfif"
                alt="a single glass of beer"
              />
              <p>My Beer Wishes</p>
            </section>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
