
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

//GetPokemon();

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
    let moveList = "";
    let abilityList = "";
    let typeList = "";

    userSearch = pkmnUserSearch.value;
    let pkmnData = await GetPokemon(userSearch);
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

    let pkmnLocation = await GetLocation(pkmnData.id);
    pkmnLocationText.innerText = pkmnLocation;
})

const GetPokemon = async (userSearch) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    const Data = await promise.json();
    return Data;
}

const GetLocation = async (pkmnId) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}/encounters`)
    const Data = await promise.json();
    console.log(Data[0].location_area.name);
    let location = Data[0].location_area.name;
    return location;
}

const GetEvolutionLine = async () => {
    const promise = await fetch(``);
    const data = await promise.json();
    console.log(data);
}
