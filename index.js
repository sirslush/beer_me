const someFunction = () => {

}

const addBeerToList = function(value){
  const url = "https://api.punkapi.com/v2/beers/" + value
    const beerList = document.getElementsByClassName('beer__id__list')[0];
    const newListItem = document.createElement('li');
    const newListLink = document.createElement('a');

    fetch(url)
    .then(response => response.json())
    .then(beers => {
      const beer = beers[0];
      newListLink.innerHTML = beer.name;

    });
    newListItem.appendChild(newListLink);
    beerList.appendChild(newListItem);
};


const grabRandomBeer = () => {
  // Fetching random beer data from API
  fetch("https://api.punkapi.com/v2/beers/random")
    .then(response => response.json())
    .then(beers => {
      // API returns an array containg only one element: we get it
      const beer = beers[0];
      // Creating DOM element for some beer properties
      const nameElement = document.createElement("h2");
      nameElement.textContent = beer.name;
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = beer.description;
      // Clear previous beer data
      const beerElement = document.getElementById("beer");
      beerElement.innerHTML = "";
      // Add beer info to the page
      beerElement.appendChild(nameElement);
      beerElement.appendChild(descriptionElement);
      addBeerToList(beer.id);
    })
    .catch(err => {
      console.error(err.message);
    });
};

const buttons = document.getElementsByClassName('beer__button');
for (const button of buttons) {
  button.addEventListener("click", grabRandomBeer);
}

const listItems =document.getElementsByClassName('beer__list__item');
for (const item of listItems) {
  item.addEventListener('click', someFunction);
}