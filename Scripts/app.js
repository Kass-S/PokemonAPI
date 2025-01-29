
let pkmnUserSearchBtn = document.getElementById("pkmnUserSearchBtn");
let pkmnUserSearch = document.getElementById("pkmnUserSearch");
let pkmnRandom = document.getElementById("pkmnRandom");



let userSearch = "pikachu";
let moveList = "";
let abilityList = "";
let typeList = "";
//GetPokemon();

const GetPokemon = async () => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    const data = await promise.json();
    console.log(data.name);
    console.log(data.id);

    console.log(data.sprites.other["official-artwork"].front_default);
    console.log(data.sprites.other["official-artwork"].front_shiny);

    for(let i = 0; i < data.types.length; i++){
        typeList += data.types[i].type.name + "\n";
    }
    console.log(typeList);

    for(let i = 0; i < data.abilities.length; i++){
        abilityList += data.abilities[i].ability.name + "\n";
    }
    console.log(abilityList);

    for(let i = 0; i < data.moves.length; i++)
    {
        moveList += data.moves[i].move.name + ", ";
    }
    console.log(moveList);

    let test = await GetLocation(data.id);
    console.log(test);
}

const GetLocation = async (pkmnId) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}/encounters`)
    const data = await promise.json();
    console.log(data[0].location_area.name);
    test2 = data[0].location_area.name;
    return test2;
}
