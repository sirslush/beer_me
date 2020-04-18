const removeBeerListItem = function(){
  const beerList = document.getElementsByClassName('beer__list__items')[0];
  beerList.removeChild(beerList.childNodes[beerList.childElementCount]);
}

const showBeerInfo = (beer) =>{
  const nameElement = document.createElement("h2");
  nameElement.textContent = beer.name;
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = beer.description;

  // const beerImg = document.createElement('img');  // Img data not accurrate and will be implimented later
  // beerImg.src = beer.image_url;

  // Clear previous beer data
  const beerElement = document.getElementsByClassName("beer__info__text")[0];
  beerElement.innerHTML = "";
  // Add beer info to the page
  beerElement.appendChild(nameElement);
  beerElement.appendChild(descriptionElement);
  // beerElement.appendChild(beerImg);  Img data not accurate and will be implimented later
}

const showBeerInfoFromList = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(beers => {
      // API returns an array containg only one element: we get it
      const beer = beers[0];
      showBeerInfo(beer);
    });

}

const addBeerToList = function(value){
  const url = "https://api.punkapi.com/v2/beers/" + value;
    const beerList = document.getElementsByClassName('beer__list__items')[0];
    const newListItem = document.createElement('li');
    const newListLink = document.createElement('div');

    newListItem.classList.add("beer__list__item");

    fetch(url)
    .then(response => response.json())
    .then(beers => {
      const beer = beers[0];
      newListLink.innerHTML = beer.name;
      newListLink.addEventListener("click", function() {
        showBeerInfoFromList(url);
    }, false);
    });
    newListItem.appendChild(newListLink);
    beerList.insertBefore(newListItem, beerList.childNodes[1]);
};


const grabRandomBeer = () => {
  // Fetching random beer data from API
  fetch("https://api.punkapi.com/v2/beers/random")
    .then(response => response.json())
    .then(beers => {
      // API returns an array containg only one element: we get it
      const beer = beers[0];
      showBeerInfo(beer);
      addBeerToList(beer.id);
      const beerList = document.getElementsByClassName('beer__list__item');
      if(beerList.length>5){
        removeBeerListItem();
      }
    })
    .catch(err => {
      console.error(err.message);
    });
};

const buttons = document.getElementsByClassName('beer__button');
for (const button of buttons) {
  button.addEventListener("click", grabRandomBeer);
}



