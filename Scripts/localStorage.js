const saveToFavorites = (pkmn) => {
    let pkmnArr = getFromFavorites();

    if(!pkmnArr.includes(pkmn)){
        pkmnArr.push(pkmn);
    }
    localStorage.setItem('Favorites', JSON.stringify(pkmnArr));
}

const getFromFavorites = () => {
    let localStorageData = localStorage.getItem('Favorites');

    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}

const removeFromFavorites = (pkmn) => {
    let localStorageData = getFromFavorites();
    let pkmnIndex = localStorageData.indexOf(pkmn);

    localStorageData.splice(pkmnIndex, 1);

    localStorage.setItem('Favorites', JSON.stringify(localStorageData));
}


 export { saveToFavorites, getFromFavorites, removeFromFavorites }