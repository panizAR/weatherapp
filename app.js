//click faren
function farentem(event) {
  event.preventDefault();
  let temelement = document.querySelector(".temperature");
  let faren = (temp * 9) / 5 + 32;
  temelement.innerHTML = Math.round(faren);

  cilielement.classList.remove("active");
  farenelement.classList.add("active");
}
let farenelement = document.querySelector("#faren");
farenelement.addEventListener("click", farentem);

//click cili
function cilitem(event) {
  event.preventDefault();
  let temelement = document.querySelector(".temperature");
  let cili = temp;
  temelement.innerHTML = Math.round(cili);

  cilielement.classList.add("active");
  farenelement.classList.remove("active");
}
let cilielement = document.querySelector("#cili");
cilielement.addEventListener("click", cilitem);

//weather main
function weather(response) {
  console.log(response.data);
  let forca = response.data.coord;
  forcast(forca);

  //get time
  let date = new Date(response.data.dt * 1000);
  console.log(date);

  //day
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dayelement = document.querySelector("#day");
  dayelement.innerHTML = day;

  //clock
  let hour = date.getHours();
  if (hour <= 9) {
    hour = `0${hour}`;
  }
  let min = date.getMinutes();
  if (min <= 9) {
    min = `0${min}`;
  }
  let clocklement = document.querySelector("#clock");
  clocklement.innerHTML = `${hour}:${min}`;

  // humidity
  let humidity = document.querySelector(".humid");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  // Wind
  let Wind = document.querySelector(".Wind");
  Wind.innerHTML = Math.round(response.data.wind.speed * 3.6);

  // temp
  temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${temp}°c`;

  // tempdescription
  let tempdescription = response.data.weather[0].description;
  console.log(tempdescription);
  let tempdescriptionelement = document.querySelector("#tempdescription");
  tempdescriptionelement.innerHTML = tempdescription;

  //icon
  let icon = response.data.weather[0].icon;
  let imgelement = document.querySelector(".weather-icon");
  imgelement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
}
let temp = null;

function searchcity(event) {
  event.preventDefault();

  //get city name
  let cityname = document.querySelector("#search-input").value;
  let cityelement = document.querySelector("h1");
  cityelement.innerHTML = cityname;

  //api
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;
  axios.get(url).then(weather);
}
//search
let formsearch = document.querySelector("#form-search");

formsearch.addEventListener("submit", searchcity);

function forcastweather(response) {
  console.log(response.data.daily);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weektempelement = document.querySelector(".tempweek");
  let weektempe = `<div class="row">`;
  days.forEach(function Forecasttep(day) {
    weektempe =
      weektempe +
      `<div class="col-2">
            <div class="tempweek-day">${day}</div>
            <div class="tempweek-icon">
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt="Cloudy icon"
                class="weather-icon"
              />
            </div>
            <div>
              <span class="tempweek-maxtemp"> 32 </span>
              <span class="tempweek-mintemp"> 2 </span>
            </div>
          </div>`;
  });
  weektempe = weektempe + `</div>`;
  weektempelement.innerHTML = weektempe;
}
function forcast(forca) {
  let forcastdata = forca;
  let lat = forcastdata.lat;
  let lon = forcastdata.lon;

  //api
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  console.log(url);
  axios.get(url).then(forcastweather);
}
