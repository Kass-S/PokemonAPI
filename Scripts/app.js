import { saveToFavorites, getFromFavorites, removeFromFavorites } from "./localStorage.js";

let pkmnUserSearchBtn = document.getElementById("pkmnUserSearchBtn");
let pkmnUserSearch = document.getElementById("pkmnUserSearch");
let pkmnRandom = document.getElementById("pkmnRandom");

let pkmnAbilities = document.getElementById("pkmnAbilities");
let pkmnMoves = document.getElementById("pkmnMoves");

let pkmnImage = document.getElementById("pkmnImage");
let pkmnNameNumber = document.getElementById("pkmnNameNumber");
let pokemonShinyBtn = document.getElementById("pokemonShinyBtn");

let pkmnType = document.getElementById("pkmnType");
let pkmnEvolutionLine = document.getElementById("pkmnEvolutionLine");
let pkmnLocationText = document.getElementById("pkmnLocationText");

let userSearch = "pikachu";
let isShiny = false;


const GetAllPokemon = async (userSearch) => {
    let moveList = "";
    let abilityList = "";
    let typeList = "";
    let evoList = "";
        
    let pkmnData = await GetPokemon(userSearch);
    if(pkmnData.id != null){
        pkmnNameNumber.innerText = `${pkmnData.name} - ${pkmnData.id}`;

        pkmnImage.src = pkmnData.sprites.other["official-artwork"].front_default;    

        for(let i = 0; i < pkmnData.types.length; i++){
            typeList += pkmnData.types[i].type.name + ", ";
        }
        pkmnType.innerText = typeList;

        for(let i = 0; i < pkmnData.abilities.length; i++){
            abilityList += pkmnData.abilities[i].ability.name + ", ";
        }
        pkmnAbilities.innerText = abilityList;

        for(let i = 0; i < pkmnData.moves.length; i++)
        {
            moveList += pkmnData.moves[i].move.name + ", ";
        }
        pkmnMoves.innerText = moveList;

        let pkmonEvoLine = await GetEvolutionLine(pkmnData.id);
        if(pkmonEvoLine.chain.evolves_to.length > 0){

            for(let i = 0; i < pkmonEvoLine.chain.evolves_to.length; i++){

                evoList += pkmonEvoLine.chain.evolves_to[i].species.name + "-";

                if(pkmonEvoLine.chain.evolves_to[i].evolves_to.length > 0){
                    for(let j = 0; j < pkmonEvoLine.chain.evolves_to[i].evolves_to.length; j++){
                        evoList += pkmonEvoLine.chain.evolves_to[i].evolves_to[j].species.name + "-";
                    }
                    
                }
            }
            pkmnEvolutionLine.innerText = pkmonEvoLine.chain.species.name + "-" + evoList;
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
        pkmnNameNumber.className = "flex justify-center text-2xl mt-5 mx-5";
        pkmnNameNumber.innerText = "Invalid. Please enter a pokemon from gens 1-5";
    }else{
        const data = await promise.json();
        if(data.id >= 650){
            pkmnNameNumber.className = "flex justify-center text-2xl mt-5 mx-5";
            pkmnNameNumber.innerText = "Invalid. Please enter a pokemon from gens 1-5";
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
})

pkmnRandom.addEventListener('click', async () => {
    userSearch = Math.floor(Math.random() * 650)
    GetAllPokemon(userSearch);
})