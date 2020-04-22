
const beerObj = {
  name: '',
  id: '',
  url: ''
};

var beerListarr = [];

const fillMoreInfo = function(beer, moreInfoText){
  moreInfoText.innerHTML = "";
  const abv = document.createElement('p');
  abv.className = "more__info__item";
  abv.innerHTML = "ABV: " + beer.abv;
  const ibu = document.createElement('p');
  ibu.className = "more__info__item";
  ibu.innerHTML = "IBU: " + beer.ibu;
  
  moreInfoText.appendChild(abv);
  moreInfoText.appendChild(ibu);
}

var acc = document.getElementsByClassName("beer__info__more");
var i;


for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

const showMoreInfo = function(){
  const seletctedBeerName = document.getElementsByTagName('h2')[0];
  let tempName = seletctedBeerName.textContent;
  for (const iterator of beerListarr) {
    iterator.name=iterator.name.replace(/^"(.*)"$/, '$1');
    if(iterator.name == tempName){
      const url = "https://api.punkapi.com/v2/beers/" + iterator.id;
      fetch(url)
      .then(response => response.json())
      .then(beers => {
      // API returns an array containg only one element: we get it
      const beer = beers[0];
    });
    }
  }   
}

const removeBeerListItem = function(){
  const beerList = document.getElementsByClassName('beer__list__items')[0];
  beerList.removeChild(beerList.childNodes[beerList.childElementCount]);
  beerListarr.shift();
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
  const moreInfoButton = document.getElementsByClassName('beer__info__more')[0];
  moreInfoButton.style.display = "block"; // disable show more
  const moreInfoText = document.getElementsByClassName('beer__info__more__text')[0];
  fillMoreInfo(beer, moreInfoText);
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

    newListItem.classList.add("beer__list__item");

    fetch(url)
    .then(response => response.json())
    .then(beers => {
      const beer = beers[0];
      newListItem.innerHTML = beer.name;
      newListItem.addEventListener("click", function() {
        showBeerInfoFromList(url);
    }, false);
    });
    beerList.insertBefore(newListItem, beerList.childNodes[1]);
};

function createBeerObj(name,id,url){
  let tempObj = Object.create(beerObj);
  tempObj.name = name;
  tempObj.id = id;
  tempObj.url = url;
  return tempObj;
}

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
      let tempBeerObj = createBeerObj(JSON.stringify(beer.name),JSON.stringify(beer.id),'url');
      beerListarr.push(tempBeerObj);
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

const moreInfo = document.getElementsByClassName('beer__info__more')[0];
moreInfo.addEventListener('click' , showMoreInfo);
moreInfo.style.display = 'none';



