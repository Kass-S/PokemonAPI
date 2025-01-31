import { saveToFavorites, getFromFavorites, removeFromFavorites } from "./localStorage.js";

let pkmnUserSearchBtn = document.getElementById("pkmnUserSearchBtn");
let pkmnUserSearch = document.getElementById("pkmnUserSearch");
let pkmnRandom = document.getElementById("pkmnRandom");
let showFavoritesBtn = document.getElementById("showFavoritesBtn");
let exitFavorites = document.getElementById("exitFavorites");
let favoritesList = document.getElementById("favoritesList");

let pkmnAbilities = document.getElementById("pkmnAbilities");
let pkmnMoves = document.getElementById("pkmnMoves");

let pkmnImage = document.getElementById("pkmnImage");
let pkmnNameNumber = document.getElementById("pkmnNameNumber");
let pokemonShinyBtn = document.getElementById("pokemonShinyBtn");
let addFavoriteBtn = document.getElementById("addFavoriteBtn");

let pkmnType = document.getElementById("pkmnType");
let pkmnEvolutionLine = document.getElementById("pkmnEvolutionLine");
let pkmnLocationText = document.getElementById("pkmnLocationText");

let userSearch = "pikachu";
let isShiny = false;


const GetAllPokemon = async (userSearch) => {
    let moveList = [];
    let abilityList = [];
    let typeList = [];
    let evoList = [];
        
    let pkmnData = await GetPokemon(userSearch);
    if(pkmnData.id != null){
        pkmnNameNumber.innerText = `${pkmnData.name} - ${pkmnData.id}`;

        pkmnImage.src = pkmnData.sprites.other["official-artwork"].front_default;    

        for(let i = 0; i < pkmnData.types.length; i++){
            typeList.push(pkmnData.types[i].type.name);
            // typeList += pkmnData.types[i].type.name + ", ";
        }
        pkmnType.innerText = typeList.join(", ");

        for(let i = 0; i < pkmnData.abilities.length; i++){
            abilityList.push(pkmnData.abilities[i].ability.name);
        }
        pkmnAbilities.innerText = abilityList.join(", ");

        for(let i = 0; i < pkmnData.moves.length; i++)
        {
            moveList.push(pkmnData.moves[i].move.name);
        }
        pkmnMoves.innerText = moveList.join(" | ");

        let pkmonEvoLine = await GetEvolutionLine(pkmnData.id);
        if(pkmonEvoLine.chain.evolves_to.length > 0){

            for(let i = 0; i < pkmonEvoLine.chain.evolves_to.length; i++){

                evoList.push(pkmonEvoLine.chain.evolves_to[i].species.name);

                if(pkmonEvoLine.chain.evolves_to[i].evolves_to.length > 0){
                    for(let j = 0; j < pkmonEvoLine.chain.evolves_to[i].evolves_to.length; j++){
                        evoList.push(pkmonEvoLine.chain.evolves_to[i].evolves_to[j].species.name);
                    }
                    
                }
            }
            pkmnEvolutionLine.innerText = pkmonEvoLine.chain.species.name + " - " + evoList.join(" - ");
        }else{
            pkmnEvolutionLine.innerText = "N/A";    
        }

        let pkmnLocation = await GetLocation(pkmnData.id);
        if(pkmnLocation){
            pkmnLocationText.innerText = pkmnLocation;
            
        }else{
            pkmnLocationText.innerText = "N/A";
        }
        
    }
}

const GetPokemon = async (userSearch) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    if(!promise.ok){
        pkmnAbilities.innerText = "Invalid. Please enter a pokemon from gens 1-5";
        pkmnEvolutionLine.innerText = "Invalid. Please enter a pokemon from gens 1-5";
        pkmnMoves.innerText = "Invalid. Please enter a pokemon from gens 1-5";
        pkmnLocationText.innerText = "Invalid. Please enter a pokemon from gens 1-5";
        pkmnType.innerText = "Invalid. Please enter a pokemon from gens 1-5";

        pkmnNameNumber.className = "flex justify-center text-2xl mt-5 mx-5";
        pkmnNameNumber.innerText = "Invalid. Please enter a pokemon from gens 1-5";
    }else{
        const data = await promise.json();
        if(data.id >= 650){
            pkmnAbilities.innerText = "Invalid. Please enter a pokemon from gens 1-5";
            pkmnEvolutionLine.innerText = "Invalid. Please enter a pokemon from gens 1-5";
            pkmnMoves.innerText = "Invalid. Please enter a pokemon from gens 1-5";
            pkmnLocationText.innerText = "Invalid. Please enter a pokemon from gens 1-5";
            pkmnType.innerText = "Invalid. Please enter a pokemon from gens 1-5";

            pkmnNameNumber.className = "flex justify-center text-2xl mt-5 mx-5";
            pkmnNameNumber.innerText = "Invalid. Please enter a pokemon from gens 1-5";
            
            return;
        }
        pkmnNameNumber.className = "flex justify-center text-3xl mt-10 mx-5";
        return data;
    }
    
}

const GetLocation = async (pkmnId) => {
    try {
        const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}/encounters`)
        const data = await promise.json();
        console.log(data[0].location_area.name);
        let location = data[0].location_area.name;
        return location;
    } catch (error) {
        console.error("N/A")
        pkmnLocationText.innerText = "N/A";
    }
    
}

const GetEvolutionLine = async (pkmnId) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`);
    const data = await promise.json();
    console.log(data.evolution_chain.url);
    let evoChainUrl = data.evolution_chain.url;

    let evoChain = await GetEvolutionChain(evoChainUrl);
    console.log(evoChain.chain.species.name);
    return evoChain;
}

const GetEvolutionChain = async (url) =>{
    const promise = await fetch(url);
    const data = await promise.json();
    return data;
}

const GetFavoritePokemon = async () => {
    let favPokemon = getFromFavorites();

    favPokemon.map(pokemon => {
        console.log(pokemon);

        let p = document.createElement('p');
        p.className = "mx-5 mb-6 text-lg text-white mt-5";
        p.innerText = pokemon;

        let removeBtn = document.createElement('i');
        removeBtn.type = 'button';
        removeBtn.className = 'fa-solid fa-x fa-sm cursor-pointer text-white ml-5';

        removeBtn.addEventListener('click', () => {
            removeFromFavorites(pokemon);
            p.remove();
        })

        p.appendChild(removeBtn);

        favoritesList.appendChild(p);
    })
}

GetAllPokemon(userSearch);

pokemonShinyBtn.addEventListener('click', async () => {
    let pkmnData = await GetPokemon(userSearch);
    if(isShiny == false){
        pkmnImage.src = pkmnData.sprites.other["official-artwork"].front_shiny;
        isShiny = true;
    }else{
        pkmnImage.src = pkmnData.sprites.other["official-artwork"].front_default;
        isShiny = false;
    } 
})

pkmnUserSearchBtn.addEventListener('click', async () => {
    userSearch = pkmnUserSearch.value;
    GetAllPokemon(userSearch);
    pkmnUserSearch.value = "";
})

pkmnRandom.addEventListener('click', async () => {
    userSearch = Math.floor(Math.random() * 650);
    GetAllPokemon(userSearch);
})

addFavoriteBtn.addEventListener('click', async () => {
    const pkmn = await GetPokemon(userSearch);
    let pkmnFavorite = pkmn.name;
    saveToFavorites(pkmnFavorite);    
})

showFavoritesBtn.addEventListener('click', () => {
    GetFavoritePokemon();
})

exitFavorites.addEventListener('click', () => {
    favoritesList.innerHTML = "";
})