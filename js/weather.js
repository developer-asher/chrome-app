function saveCoords(obj) {
    localStorage.setItem("coords", JSON.stringify(obj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude,
        coordsObj = {
            latitude : latitude,
            longitude : longitude
        };

    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Can't get your location information.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem("coords");

    if(loadedCoords === null) {
        askForCoords();
    } else {
        //getWeahter
    }
}

function init(){
    loadCoords();
}

init();