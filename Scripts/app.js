
let pkmnUserSearchBtn = document.getElementById("pkmnUserSearchBtn");
let pkmnUserSearch = document.getElementById("pkmnUserSearch");
let pkmnRandom = document.getElementById("pkmnRandom");

let pkmnAbilities = document.getElementById("pkmnAbilities");
let pkmnMoves = document.getElementById("pkmnMoves");

let pkmnImage = document.getElementById("pkmnImage");
let pkmnNameNumber = document.getElementById("pkmnNameNumber");

let pkmnType = document.getElementById("pkmnType");
let pkmnEvolutionLine = document.getElementById("pkmnEvolutionLine");
let pkmnLocationText = document.getElementById("pkmnLocationText");

let userSearch = "pikachu";
let moveList = "";
let abilityList = "";
let typeList = "";
//GetPokemon();

pkmnUserSearchBtn.addEventListener('click', async () => {
    //userSearch = pkmnUserSearch.value;
    let pkmnData = await GetPokemon(userSearch);
    console.log(pkmnData.name);
    console.log(pkmnData.id);
    pkmnNameNumber.innerText = `${pkmnData.name} - ${pkmnData.id}`;

    pkmnImage.src = pkmnData.sprites.other["official-artwork"].front_default;
    console.log(pkmnData.sprites.other["official-artwork"].front_shiny);

    for(let i = 0; i < pkmnData.types.length; i++){
        typeList += pkmnData.types[i].type.name + "\n";
    }
    pkmnType.innerText = typeList;

    for(let i = 0; i < pkmnData.abilities.length; i++){
        abilityList += pkmnData.abilities[i].ability.name + "\n";
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
