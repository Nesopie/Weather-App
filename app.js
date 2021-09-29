const search = document.querySelector(".search");

getData("Hyderabad");

search.addEventListener("keypress", (e) => {
    let searchValue = undefined;
    if(e.keyCode === 13) {
        searchValue = search.value;
        search.value = "";
        getData(searchValue);
    }
});

async function getData(query) {
    const searchValue = query;
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=28bc49f2fba72632524305bb7b1c67dc`, {mode: 'cors'});
    if((response.status === 400) || (response.status === 404)) {
        throwErrorMessage();
    }else {
        const data = await response.json();
        console.log(data);
        displayData(data);
    }
}

function displayData(data) {
    const body = document.querySelector("body");
    body.removeChild(body.lastChild);

    const mainCard = document.createElement("div");
    mainCard.classList.add("mainCard");

    const weatherDescription = document.createElement("div");
    weatherDescription.classList.add("weatherDescription");
    weatherDescription.innerText = data.weather[0].description;
    const weatherArea = document.createElement("div");
    weatherArea.classList.add("weatherArea");
    weatherArea.innerText = data.name.toUpperCase();

    const weatherTemperature = document.createElement("span");
    weatherTemperature.classList.add("weatherTemperature");
    weatherTemperature.innerText = `${Math.trunc(data.main.temp - 273.15)}`;

    const weatherTempContainer = document.createElement("div");
    weatherTempContainer.classList.add("weatherTempContainer");

    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weatherContainer");

    const humidity = document.createElement("div");
    humidity.classList.add("humidity");
    humidity.innerText = "Humidity: " + data.main.humidity + "%";

    const pressure = document.createElement("div");
    pressure.classList.add("pressure");
    pressure.innerText = "Pressure: " + data.main.pressure;

    const feelsLike = document.createElement("div");
    feelsLike.classList.add("feelsLike");
    feelsLike.innerText = `Feels like ${Math.trunc(data.main.feels_like - 273.15)} °C`;

    mainCard.appendChild(weatherDescription);
    mainCard.appendChild(weatherArea);

    weatherTempContainer.appendChild(weatherTemperature);
    mainCard.appendChild(weatherTempContainer);

    mainCard.appendChild(feelsLike);
    mainCard.appendChild(pressure);
    mainCard.appendChild(humidity);

    weatherContainer.appendChild(mainCard);

    body.appendChild(weatherContainer);
}

function throwErrorMessage() {
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerText = "City not found";

    const searchContainer = document.querySelector(".searchContainer");
    searchContainer.appendChild(error);

    setTimeout(() => {
        searchContainer.removeChild(error);
    },5000)
}
