const searchBar = document.getElementById("searchBar");
const pokeContainer = document.getElementById("poke-container");
let pokemon = [];
const pokeNum = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const main_types = Object.keys(colors);

//Looping through the pokemon
const pokeFetch = async () => {
  for (let i = 1; i <= pokeNum; i++) {
    await pokeGet(i);
  }
};

//Sending GET request to the server
const pokeGet = async (id) => {
  apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id;
  await axios.get(apiUrl).then((res) => {
    pokemon = res.data;
    createPokeCard(pokemon);
  });
};

//Creating Pokemon Cards to display img, name and type
const createPokeCard = (pokemon) => {
  const pokeElement = document.createElement("div");
  pokeElement.classList.add("pokemon");

  const pokeType = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => pokeType.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokeElement.style.backgroundColor = color;

  const pokeInnerHTML = `
  <div class = 'img-container'>
  <img src='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png'></img>
  </div>
  <div class='description-container'>
  <p class='p-id'>#${pokemon.id}</p>
  <h4 class='p-name'>${name}</h4>
  <p class='p-type'>${type}</p>
  </div>
    `;

  pokeElement.innerHTML = pokeInnerHTML;
  pokeContainer.appendChild(pokeElement);
};

pokeFetch();
