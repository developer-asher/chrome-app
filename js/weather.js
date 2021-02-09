const weatherApiKey = 'f71b1c8916611cf4db595cc59f68bf20';
const textCoords = 'coords';
const weather = document.querySelector('.weather');

function getWeahter(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temp = json.main.temp;
        const place = json.name;
        
        weather.innerText = `${temp}℃ / ${place}`;
    });
}

function saveCoords(obj) {
    localStorage.setItem(textCoords, JSON.stringify(obj));
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
    const loadedCoords = localStorage.getItem(textCoords);

    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        // console.log(parsedCoords);
        getWeahter(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();