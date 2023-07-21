let locationDisplay = document.querySelector("#locationDisplay");
let tempDisplay = document.querySelector("#tempDisplay");
let windDisplay = document.querySelector("#windDisplay");
let skyDisplay = document.querySelector("#skyDisplay");
let locationList = document.querySelector("#savedLocations");


function getLocation(location, isHome){

    const locationAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${location},&appid=0cd3b659ad8fdd87917a89043bdee3dc`;

    fetch(locationAPI)
    .then((response) =>{
        return response.json();
    })
    .then((data) => {
        getWeather(data,isHome);
        return data;
    })
    .catch((err) => {
        console.error(err);
    });

}

function getWeather(data, isHome){
    
    console.log(data);

    const coords = {
        lat: 0,
        lon: 0
    };

    let location = data[0].name;

    coords.lat = data[0].lat;
    coords.lon = data[0].lon;

    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=0cd3b659ad8fdd87917a89043bdee3dc`;

    console.log(weatherAPI);

    fetch(weatherAPI)
    .then((response) =>{
        return response.json();
    })
    .then((data) => {
        console.log(data);
        displayLocation(data, location, isHome);
        displayWeather(data, location);
    })
    .catch((err) => {
        console.error(err);
    });
}

function displayWeather(data, location){
    locationDisplay.textContent = location + ", " + data.sys.country;
    tempDisplay.textContent = data.main.temp + " °F";
    skyDisplay.textContent = data.weather[0].description;
    windDisplay.textContent = data.wind.speed + " MPH";
}

// function saveLocation(data, isHome) {   
//     selectedAreas.addArea(data, isHome);
// }



function displayLocation(data, location, isHome){
    let newLi = document.createElement("li");
    let locationLink = document.createElement("a");
    let dateHeader = document.createElement("p");
    dateHeader.textContent = "Time Fetched";
    let dateFetched = document.createElement("p");
    let date = new Date();

    let removeButton = document.createElement("button");

    dateFetched.textContent = date;

    if(isHome == true){
        locationLink.textContent = location + " (Home)";
    }
    else{
        locationLink.textContent = location;
    }

    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
        newLi.remove();
    })

    locationLink.addEventListener("click", () => {
        displayWeather(data, location);
    })
    newLi.append(locationLink);
    newLi.append(removeButton);
    newLi.append(dateHeader);
    newLi.append(dateFetched);
    locationList.append(newLi);
}

let form = document.querySelector("form");
let locationInput = document.querySelector("#location");
let isHome = document.querySelector("#home");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    getLocation(locationInput.value, isHome.checked);
    locationInput.value = "";
    isHome.checked = false;
});